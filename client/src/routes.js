import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Auth from './hoc/Auth';

import Home from './components/Home';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/Register';
import Shop from './components/Shop';
import ProductPage from './components/Product';

import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/ManageCategories';
import UserCart from './components/User/Cart';
import UpdateProfile from './components/User/UpdateProfile';
import ManageSite from './components/User/Admin/ManageSite';

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/user/cart" component={Auth(UserCart, true)} />
				<Route
					exact
					path="/user/user_profile"
					component={Auth(UpdateProfile, true)}
				/>
				<Route
					exact
					path="/user/dashboard"
					component={Auth(UserDashboard, true)}
				/>
				<Route
					exact
					path="/admin/add_product"
					component={Auth(AddProduct, true)}
				/>
				<Route
					exact
					path="/admin/manage_categories"
					component={Auth(ManageCategories, true)}
				/>
				<Route
					exact
					path="/admin/site_info"
					component={Auth(ManageSite, true)}
				/>
				<Route exact path="/register" component={Auth(Register, false)} />
				<Route
					exact
					path="/register_login"
					component={Auth(RegisterLogin, false)}
				/>
				<Route
					exact
					path="/product_detail/:id"
					component={Auth(ProductPage, null)}
				/>
				<Route exact path="/shop" component={Auth(Shop, null)} />
				<Route exact path="/" component={Auth(Home, null)} />
			</Switch>
		</Layout>
	);
};

export default Routes;
