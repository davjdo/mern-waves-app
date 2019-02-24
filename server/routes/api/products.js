const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Brand, Wood and Product models
const { Brand } = require('../../models/Brand');
const { Wood } = require('../../models/Wood');
const { Product } = require('../../models/Product');

// Auth and Admin middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');

/**
|--------------------------------------------------
|											Brand
|--------------------------------------------------
*/

// @route   GET api/products/brands
// @desc    GET brands
// @access  Private
router.get('/brands', (req, res) => {
	Brand.find({}, (err, brands) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(brands);
	});
});

// @route   POST api/products/brand
// @desc    Add a Brand
// @access  Private
router.post('/brand', auth, admin, (req, res) => {
	const brand = new Brand(req.body);
	brand.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			brand: doc
		});
	});
});

/**
|--------------------------------------------------
|											Wood
|--------------------------------------------------
*/

// @route   GET api/products/woods
// @desc    GET woods
// @access  Private
router.get('/woods', (req, res) => {
	Wood.find({}, (err, woods) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(woods);
	});
});

// @route   POST api/products/wood
// @desc    Add a Wood
// @access  Private
router.post('/wood', auth, admin, (req, res) => {
	const wood = new Wood(req.body);
	wood.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			wood: doc
		});
	});
});

/**
|--------------------------------------------------
|											Product 
|--------------------------------------------------
*/

// @route   POST api/products/shop
// @desc    Get article products to shop with filtering
// @access  Public
router.post('/shop', (req, res) => {
	let order = req.body.order ? req.body.order : 'desc';
	let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
	let skip = parseInt(req.body.skip);
	let filters = req.body.filters;
	let findArgs = {};
	for (let key in filters) {
		if (filters[key].length > 0) {
			if (key === 'price') {
				findArgs[key] = {
					$gte: filters[key][0],
					$lte: filters[key][1]
				};
			} else {
				findArgs[key] = filters[key];
			}
		}
	}
	Product.find(findArgs)
		.populate('brand')
		.populate('wood')
		.sort([[sortBy, order]])
		.skip(skip)
		.limit(limit)
		.exec((err, articles) => {
			if (err) return res.status(400).send(err);
			return res.status(200).json({
				size: articles.length,
				articles
			});
		});
});

// @route   POST api/products/article
// @desc    Add an article product
// @access  Private
router.post('/article', auth, admin, (req, res) => {
	const product = new Product(req.body);
	product.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			article: doc
		});
	});
});

// @route   GET api/products/articles?sortBy=createdAt&order=desc&limit=4&skip=2
// 					Or api/products/articles?sortBy=sold&order=desc&limit=4
// @desc    Get article products by arrival (most recent to former) or by sell
// @access  Private
router.get('/articles', (req, res) => {
	let order = req.query.order ? req.query.order : 'asc';
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
	let limit = req.query.limit ? parseInt(req.query.limit) : 100;
	Product.find()
		.populate('brand')
		.populate('wood')
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((err, articles) => {
			if (err) return res.status(400).send(err);
			return res.send(articles);
		});
});

// @route   GET api/products/articles_by_id?id=fshfnd,dsds,dsds&type=array
// @desc    Get article products by id (query string)
// @access  Private
router.get('/articles_by_id', (req, res) => {
	let type = req.query.type;
	let items = req.query.id;
	if (type === 'array') {
		let ids = req.query.id.split(',');
		items = [];
		items = ids.map(item => {
			return mongoose.Types.ObjectId(item);
		});
	}
	Product.find({ _id: { $in: items } })
		.populate('brand')
		.populate('wood')
		.exec((err, docs) => {
			return res.status(200).send(docs);
		});
});

module.exports = router;
