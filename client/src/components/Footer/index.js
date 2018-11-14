import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCompass,
	faPhone,
	faClock,
	faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
	return (
		<footer className="bck_b_dark">
			<div className="container">
				<div className="logo">Waves</div>
				<div className="wrapper">
					<div className="left">
						<h2>Contact information</h2>
						<div className="business_nfo">
							<div className="tag">
								<FontAwesomeIcon icon={faCompass} className="icon" />
								<div className="nfo">
									<div>Address</div>
									<div>Kramer 2345</div>
								</div>
							</div>
							<div className="tag">
								<FontAwesomeIcon icon={faPhone} className="icon" />
								<div className="nfo">
									<div>Phone</div>
									<div>2345-222-322</div>
								</div>
							</div>
							<div className="tag">
								<FontAwesomeIcon icon={faClock} className="icon" />
								<div className="nfo">
									<div>Working hours</div>
									<div>Mon-Sun/ 9am-8pm</div>
								</div>
							</div>
							<div className="tag">
								<FontAwesomeIcon icon={faEnvelope} className="icon" />
								<div className="nfo">
									<div>Email</div>
									<div>nfo@waves.com</div>
								</div>
							</div>
						</div>
					</div>
					<div className="right">
						<h2>Be the first to know</h2>
						<div>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel est
								iste tempore facilis perferendis perspiciatis assumenda quos
								maiores veritatis, sed porro quia nihil reiciendis provident
								ratione incidunt quidem eius doloremque.
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
