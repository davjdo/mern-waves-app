import React, { Component } from 'react';
import PageTop from '../utils/PageTop';
import { frets, price } from '../utils/Form/FixedCategories';
import { connect } from 'react-redux';
import {
	getProductsToShop,
	getBrands,
	getWoods
} from '../../actions/products_actions';
import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';
import LoadMoreCards from './LoadMoreCards';

class Shop extends Component {
	state = {
		grid: '',
		limit: 6,
		skip: 0,
		filters: {
			brand: [],
			frets: [],
			wood: [],
			price: []
		}
	};
	componentDidMount() {
		this.props.getBrands();
		this.props.getWoods();
		this.props.getProductsToShop(
			this.state.skip,
			this.state.limit,
			this.state.filters
		);
	}

	handlePrice = value => {
		const data = price;
		let array = [];
		for (let key in data) {
			if (data[key]._id === parseInt(value)) {
				array = data[key].array;
			}
		}
		return array;
	};

	handleFilters = (filters, category) => {
		const newFilters = { ...this.state.filters };
		newFilters[category] = filters;
		if (category === 'price') {
			let priceValues = this.handlePrice(filters);
			newFilters[category] = priceValues;
		}
		this.showFilteredResults(newFilters);
		this.setState({
			filters: newFilters
		});
	};

	showFilteredResults = filters => {
		this.props.getProductsToShop(0, this.state.limit, filters).then(() => {
			this.setState({ skip: 0 });
		});
	};

	render() {
		const products = this.props.products;
		return (
			<div>
				<PageTop title="Browse products" />
				<div className="container">
					<div className="shop_wrapper">
						<div className="left">
							<CollapseCheckbox
								initState={true}
								title="Brands"
								list={products.brands}
								handleFilters={filters => this.handleFilters(filters, 'brand')}
							/>
							<CollapseCheckbox
								initState={false}
								title="Frets"
								list={frets}
								handleFilters={filters => this.handleFilters(filters, 'frets')}
							/>
							<CollapseCheckbox
								initState={false}
								title="Wood"
								list={products.woods}
								handleFilters={filters => this.handleFilters(filters, 'wood')}
							/>
							<CollapseRadio
								initState={true}
								title="Price"
								list={price}
								handleFilters={filters => this.handleFilters(filters, 'price')}
							/>
						</div>
						<div className="right">
							<div className="shop_options">
								<div className="shop_grids clear">grids</div>
							</div>
							<div>
								<LoadMoreCards
									grid={this.state.grid}
									limit={this.state.limit}
									size={products.toShopSize}
									products={products.toShop}
									loadMore={() => console.log('load more')}
								/>
							</div>
						</div>
					</div>
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
	{ getProductsToShop, getBrands, getWoods }
)(Shop);
