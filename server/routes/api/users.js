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

module.exports = router;
