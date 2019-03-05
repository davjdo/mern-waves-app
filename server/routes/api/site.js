const express = require('express');
const router = express.Router();

// Load Site Model
const { Site } = require('../../models/Site');

// Auth and Admin middleware
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');

/**
|--------------------------------------------------
|                    Site
|--------------------------------------------------
*/

// @route   GET api/site/site-data
// @desc    Get site info
// @access  Public
router.get('/site-data', (req, res) => {
	Site.find({}, (err, site) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(site[0].siteInfo);
	});
});

// @route   POST api/site/site-data
// @desc    Edit site information
// @access  Private
router.post('/site-data', auth, admin, (req, res) => {
	Site.findOneAndUpdate(
		{ name: 'Site' },
		{ $set: { siteInfo: req.body } },
		{ new: true },
		(err, doc) => {
			if (err) return res.json({ success: false, err });
			return res.status(200).send({
				success: true,
				siteInfo: doc.siteInfo
			});
		}
	);
});

module.exports = router;
