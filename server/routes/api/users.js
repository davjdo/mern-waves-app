const express = require('express');
const router = express.Router();

// Load User Model
const { User } = require('../../models/User');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
	const user = new User(req.body);
	user.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			userData: doc
		});
	});
});

module.exports = router;
