const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to mongo
mongoose.Promise = global.Promise;
mongoose
	.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true }
	) // Adding new mongo url parser
	.then(() => console.log('Mongo DB Connected ...'))
	.catch(err => console.log(err));

// Add Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Express server running
const port = process.env.PORT || 3002;
app.listen(port, () => {
	console.log(`Server running at port ${port}`);
});
