import React from 'react';
import Login from './Login';
import MyButton from '../utils/Button';

const RegisterLogin = () => {
	return (
		<div className="page_wrapper">
			<div className="container">
				<div className="register_login_container">
					<div className="left">
						<h1>New Customers</h1>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
							dolorem corporis voluptatum nihil asperiores sed saepe unde rem,
							possimus ab optio ut dolores officia accusamus fugit voluptas
							beatae sapiente ipsa.
						</p>
						<MyButton
							type="default"
							title="Create an account"
							linkTo="/register"
							addStyles={{
								margin: '10px 0 0 0'
							}}
						/>
					</div>
					<div className="right">
						<h2>Registered Customers</h2>
						<p>If you have an account, please log in.</p>
						<Login />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterLogin;
