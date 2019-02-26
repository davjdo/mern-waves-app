const express = require('express');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const router = express.Router();

// Load User Model
const { User } = require('../../models/User');

// Auth and Admin middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');

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

module.exports = router;
