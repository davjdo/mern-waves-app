import React, { Component } from 'react';
import CardBlockShop from '../utils/CardBlockShop';

class LoadMoreCards extends Component {
	render() {
		return (
			<div>
				<div>
					<CardBlockShop grid={this.props.grid} list={this.props.products} />
				</div>
				{this.props.size > 0 && this.props.size >= this.props.limit ? (
					<div className="load_more_container">
						<span onClick={() => this.props.loadMore()}>Load More</span>
					</div>
				) : null}
			</div>
		);
	}
}

export default LoadMoreCards;
