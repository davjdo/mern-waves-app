const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
require('dotenv').config();

const getEmailData = (to, name, token, template) => {
	let data = null;
	switch (template) {
		case 'welcome':
			data = {
				from: 'Waves <waves.guitars.rev@gmail.com',
				to,
				subject: `Welcome to waves ${name}`,
				html: welcome()
			};
			break;
		default:
			data;
	}
	return data;
};

const sendEmail = (to, name, token, type) => {
	const smtpTransport = mailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD
		}
	});
	const mail = getEmailData(to, name, token, type);
	smtpTransport.sendMail(mail, function(error, response) {
		if (error) {
			console.log(error);
		} else {
			console.log('email send');
		}
		smtpTransport.close();
	});
};

module.exports = { sendEmail };
