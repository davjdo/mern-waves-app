const express = require('express');
const router = express.Router();

// Load User Model
const { User } = require('../models/User');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/users/register', (req, res) => {
	res.status(200);
});

module.exports = router;
