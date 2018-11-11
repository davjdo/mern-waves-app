// Load User Model
const { User } = require('../models/User');

let admin = (req, res, next) => {
	if (req.user.role === 0) {
		return res.send('You are not an administrator');
	}
	next();
};

module.exports = { admin };
