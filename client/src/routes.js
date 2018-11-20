import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './hoc/Auth';
import Layout from './hoc/Layout';
import Home from './components/Home';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/Register';
import UserDashboard from './components/User';

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route
					exact
					path="/user/dashboard"
					component={Auth(UserDashboard, true)}
				/>
				<Route exact path="/register" component={Auth(Register, false)} />
				<Route
					exact
					path="/register_login"
					component={Auth(RegisterLogin, false)}
				/>
				<Route exact path="/" component={Auth(Home, null)} />
			</Switch>
		</Layout>
	);
};

export default Routes;
