const express = require('express');
const router = express.Router();

// Load Brand and Wood models
const { Brand } = require('../../models/Brand');
const { Wood } = require('../../models/Wood');

// Auth and Admin middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');

// @route   GET api/products/brands
// @desc    GET brands
// @access  Private
router.get('/brands', auth, admin, (req, res) => {
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

// @route   GET api/products/woods
// @desc    GET woods
// @access  Private
router.get('/woods', auth, admin, (req, res) => {
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

module.exports = router;
