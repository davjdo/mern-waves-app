import React, { Component } from 'react';
import PageTop from '../utils/PageTop';
import { frets } from '../utils/Form/FixedCategories';
import { connect } from 'react-redux';
import { getBrands, getWoods } from '../../actions/products_actions';
import CollapseCheckbox from '../utils/CollapseCheckbox';

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
	}

	handleFilters = (filters, category) => {
		const newFilters = { ...this.state.filters };
		newFilters[category] = filters;
		this.setState({
			filters: newFilters
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
								initState={true}
								title="Wood"
								list={products.woods}
								handleFilters={filters => this.handleFilters(filters, 'wood')}
							/>
						</div>
						<div className="right">right</div>
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
	{ getBrands, getWoods }
)(Shop);
