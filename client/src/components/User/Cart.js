import React, { Component } from 'react';
import UserLayout from '../../hoc/UserLayout';
import UserProductBlock from '../utils/User/ProductBlock';
import { connect } from 'react-redux';
import { getCartItems } from '../../actions/user_actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons';

class Cart extends Component {
	state = {
		loading: true,
		total: 0,
		showTotal: false,
		showSuccess: false
	};

	componentDidMount() {
		let cartItems = [];
		let user = this.props.user;
		if (user.userData.cart) {
			if (user.userData.cart.length > 0) {
				user.userData.cart.forEach(item => {
					cartItems.push(item.id);
				});
				this.props
					.getCartItems(cartItems, user.userData.cart)
					.then(response => {});
			}
		}
	}

	removeFromCart = id => {};

	render() {
		return (
			<UserLayout>
				<div>
					<h1>My cart</h1>
					<div className="user_cart">
						<UserProductBlock
							products={this.props.user}
							type="cart"
							removeItem={id => this.removeFromCart(id)}
						/>
					</div>
				</div>
			</UserLayout>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(
	mapStateToProps,
	{ getCartItems }
)(Cart);
