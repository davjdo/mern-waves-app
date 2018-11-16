import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './components/Home';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/Register';
import UserDashboard from './components/User';

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/user/dashboard" component={UserDashboard} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/register_login" component={RegisterLogin} />
				<Route exact path="/" component={Home} />
			</Switch>
		</Layout>
	);
};

export default Routes;
