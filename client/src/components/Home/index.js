import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardBlock from '../utils/CardBlock';
import { connect } from 'react-redux';
import {
	getProductsBySell,
	getProductsByArrival
} from '../../actions/products_actions';

class Home extends Component {
	componentDidMount() {
		this.props.getProductsBySell();
		this.props.getProductsByArrival();
	}

	render() {
		return (
			<div>
				<HomeSlider />
				<CardBlock
					list={this.props.products.bySell}
					title="Best Selling Guitars"
				/>
				<HomePromotion />
				<CardBlock list={this.props.products.byArrival} title="New arrivals" />
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
	{ getProductsBySell, getProductsByArrival }
)(Home);
