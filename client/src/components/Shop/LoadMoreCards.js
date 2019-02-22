import React, { Component } from 'react';
import CardBlockShop from '../utils/CardBlockShop';

class LoadMoreCards extends Component {
	render() {
		return (
			<div>
				<div>
					<CardBlockShop grid={this.props.grid} list={this.props.products} />
				</div>
			</div>
		);
	}
}

export default LoadMoreCards;
