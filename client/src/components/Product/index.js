import React, { Component } from 'react';
import PageTop from '../utils/PageTop';
import ProdInfo from './ProdInfo';
import ProdImage from './ProdImage';
import { connect } from 'react-redux';
import {
	getProductDetail,
	clearProductDetail
} from '../../actions/products_actions';
import { addToCart } from '../../actions/user_actions';

class ProductPage extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getProductDetail(id).then(response => {
			if (!this.props.products.prodDetail) {
				this.props.history.push('/');
			}
		});
	}

	componentWillUnmount() {
		this.props.clearProductDetail();
	}

	addToCartHandler = id => {
		this.props.addToCart(id);
	};

	render() {
		return (
			<div>
				<PageTop title="Product detail" />
				<div className="container">
					{this.props.products.prodDetail ? (
						<div className="product_detail_wrapper">
							<div className="left">
								<div style={{ width: '500px' }}>
									<ProdImage detail={this.props.products.prodDetail} />
								</div>
							</div>
							<div className="right">
								<ProdInfo
									addToCart={id => this.addToCartHandler(id)}
									detail={this.props.products.prodDetail}
								/>
							</div>
						</div>
					) : (
						'Loading...'
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.products
	};
};

export default connect(
	mapStateToProps,
	{ getProductDetail, clearProductDetail, addToCart }
)(ProductPage);
