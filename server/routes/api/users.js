const express = require('express');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const router = express.Router();
const mongoose = require('mongoose');
const async = require('async');
const SHA1 = require('crypto-js/sha1');
const multer = require('multer');

// Load User, Product and Payment Models
const { User } = require('../../models/User');
const { Product } = require('../../models/Product');
const { Payment } = require('../../models/Payment');

// Auth and Admin middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');

// Utils
const { sendEmail } = require('../../utils/mail/index');

// Multer
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	}
	// fileFilter: (req, file, cb) => {
	// 	const ext = path.extname(file.originalname);
	// 	if (ext !== '.jpg' && ext !== '.png') {
	// 		return cb(res.status(400).end('only jpg, png is allowed'), false);
	// 	}
	// 	cb(null, true);
	// }
});
const upload = multer({ storage: storage }).single('file');

// @route   POST api/users/uploadfile
// @desc    Add a image to uploads/ directory with multer
// @access  Private
router.post('/uploadfile', auth, admin, (req, res) => {
	upload(req, res, err => {
		if (err) return res.json({ success: false, err });
		return res.json({ success: true });
	});
});

// @route   GET api/users/admin-files
// @desc    Get images from uploads/ directory with multer
// @access  Private
const fs = require('fs');
const path = require('path');
router.get('/admin-files', auth, admin, (req, res) => {
	const dir = path.resolve('.') + '/uploads/';
	fs.readdir(dir, (err, items) => {
		return res.status(200).send(items);
	});
});

// @route   GET api/users/download/:id
// @desc    Download images from uploads/ directory with multer
// @access  Private
router.get('/download/:id', auth, admin, (req, res) => {
	const file = path.resolve('.') + `/uploads/${req.params.id}`;
	res.download(file);
});

// @route   GET api/users/auth
// @desc    Route if token is valid, checking in react is User is authenticated
// @access  Private
router.get('/auth', auth, (req, res) => {
	res.status(200).json({
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastName: req.user.lastName,
		role: req.user.role,
		cart: req.user.cart,
		history: req.user.history
	});
});

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		sendEmail(doc.email, doc.name, null, 'welcome');
		return res.status(200).json({
			success: true
		});
	});
});

// @route   POST api/users/login
// @desc    Log a user
// @access  Public
router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: 'Auth failed, email not found'
			});
		}
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					loginSuccess: false,
					message: 'Wrong password'
				});
			}
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res
					.cookie('w_auth', user.token)
					.status(200)
					.json({
						loginSuccess: true
					});
			});
		});
	});
});

// @route   GET api/users/logout
// @desc    Logout a user with auth middleware
// @access  Private
router.get('/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
		if (err)
			return res.json({
				success: false,
				err
			});
		return res.status(200).json({ success: true });
	});
});

// @route POST api/users/uploadimage
// @desc Add an image
// @access Private
router.post('/uploadimage', auth, admin, formidable(), (req, res) => {
	cloudinary.uploader.upload(
		req.files.file.path,
		result => {
			res.status(200).send({
				public_id: result.public_id,
				url: result.url
			});
		},
		{
			public_id: `${Date.now()}`,
			ressource_type: 'auto',
			folder: 'waves'
		}
	);
});

// @route GET api/users/removeimage?^public_id=${id}
// @desc Remove an image
// @access Private
router.get('/removeimage', auth, admin, (req, res) => {
	let public_id = req.query.public_id;
	cloudinary.uploader.destroy(public_id, (error, result) => {
		if (error)
			return res.json({
				success: false,
				error
			});
		res.status(200).send('ok');
	});
});

// @route   POST api/users/add-to-cart
// @desc    add a product to cart
// @access  Private
router.post('/add-to-cart', auth, (req, res) => {
	User.findOne({ _id: req.user._id }, (err, doc) => {
		let duplicate = false;
		doc.cart.forEach(item => {
			if (item.id == req.query.productId) {
				duplicate = true;
			}
		});
		if (duplicate) {
			User.findOneAndUpdate(
				{
					_id: req.user._id,
					'cart.id': mongoose.Types.ObjectId(req.query.productId)
				},
				{ $inc: { 'cart.$.quantity': 1 } },
				{ new: true },
				(err, doc) => {
					if (err) return res.json({ success: false, err });
					res.status(200).json(doc.cart);
				}
			);
		} else {
			User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: {
						cart: {
							id: mongoose.Types.ObjectId(req.query.productId),
							quantity: 1,
							date: Date.now()
						}
					}
				},
				{ new: true },
				(err, doc) => {
					if (err) return res.json({ success: false, err });
					res.status(200).json(doc.cart);
				}
			);
		}
	});
});

// @route   POST api/users/remove-from-cart
// @desc    remove a product from cart
// @access  Private
router.get('/remove-from-cart', auth, (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.user._id },
		{
			$pull: {
				cart: {
					id: mongoose.Types.ObjectId(req.query._id)
				}
			}
		},
		{ new: true },
		(err, doc) => {
			let cart = doc.cart;
			let array = cart.map(item => {
				return mongoose.Types.ObjectId(item.id);
			});
			Product.find({ _id: { $in: array } })
				.populate('brand')
				.populate('wood')
				.exec((err, cartDetail) => {
					res.status(200).json({
						cartDetail,
						cart
					});
				});
		}
	);
});

// @route   POST api/users/success-buy
// @desc    add success buy route after cart is paid
// @access  Private
router.post('/success-buy', auth, (req, res) => {
	let history = [];
	let transactionData = {};
	const date = new Date();
	const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
		req.user._id
	)
		.toString()
		.substring(0, 8)}`;

	// user history
	req.body.cartDetail.forEach(item => {
		history.push({
			porder: po,
			dateOfPurchase: Date.now(),
			name: item.name,
			brand: item.brand.name,
			id: item._id,
			price: item.price,
			quantity: item.quantity,
			paymentId: req.body.paymentData.paymentID
		});
	});
	// payment dashboard
	transactionData.user = {
		id: req.user._id,
		name: req.user.name,
		lastName: req.user.lastName,
		email: req.user.email
	};
	transactionData.data = {
		...req.body.paymentData,
		porder: po
	};
	transactionData.product = history;

	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $push: { history: history }, $set: { cart: [] } },
		{ new: true },
		(err, user) => {
			if (err) return res.json({ success: false, err });
			const payment = new Payment(transactionData);
			payment.save((err, doc) => {
				if (err) return res.json({ success: false, err });
				let products = [];
				doc.product.forEach(item => {
					products.push({
						id: item.id,
						quantity: item.quantity
					});
				});
				async.eachSeries(
					products,
					(item, callback) => {
						// update
						Product.update(
							{ _id: item.id },
							{
								$inc: {
									sold: item.quantity
								}
							},
							{ new: false },
							callback
						);
					},
					err => {
						if (err) return res.json({ success: false, err });
						sendEmail(user.email, user.name, null, 'purchase', transactionData);
						res.status(200).json({
							success: true,
							cart: user.cart,
							cartDetail: []
						});
					}
				);
			});
		}
	);
});

// @route   POST api/users/update-profile
// @desc add route to update user personal information
// @access  Private
router.post('/update-profile', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$set: req.body
		},
		{ new: true },
		(err, doc) => {
			if (err) return res.json({ success: false, err });
			res.status(200).send({ success: true });
		}
	);
});

module.exports = router;
