const express = require('express');
const router = express.Router();

// Load Brand Model
const { Brand } = require('../../models/Brand');

// Auth middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');

// @route   GET api/products/brand
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

module.exports = router;
