const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const cors = require('cors');

// Import routes
const users = require('./routes/api/users');
const products = require('./routes/api/products');
const site = require('./routes/api/site');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to mongo
mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true }) // Adding new mongo url parser
	.then(() => console.log('Mongo DB Connected ...'))
	.catch(err => console.log(err));

// Add Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));
app.use(cors());
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET
});

// Use routes
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/site', site);

// Serve static assets if in production mode
if (process.env.NODE_ENV === 'production') {
	const path = require('path');
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
	});
}

// Express server running
const port = process.env.PORT || 3002;
app.listen(port, () => {
	console.log(`Server running at port ${port}`);
});
