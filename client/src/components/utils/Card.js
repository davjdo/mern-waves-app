import React, { Component } from 'react';
import MyButton from './Button';

class Card extends Component {
	renderCardImage = images => {
		if (images.length > 0) {
			return images[0].url;
		} else {
			return '/images/image_not_available.png';
		}
	};

	render() {
		const props = this.props;
		return (
			<div className={`card_item_wrapper ${props.grid}`}>
				<div
					className="image"
					style={{
						background: `url(${this.renderCardImage(props.images)}) no-repeat`
					}}
				/>
				<div className="action_container">
					<div className="tags">
						<div className="brand">{props.brand.name}</div>
						<div className="name">{props.name}</div>
						<div className="price">${props.price}</div>
					</div>
				</div>
				{props.grid ? (
					<div className="description">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
						natus, consequuntur magni debitis facere quo molestiae aliquam culpa
						esse fuga! Ipsam magni perspiciatis, nisi est obcaecati ad
						laudantium at reiciendis.
					</div>
				) : null}
				<div className="actions">
					<div className="button_wrapp">
						<MyButton
							type="default"
							altClass="card_link"
							title="View product"
							linkTo={`/product_detail/${props._id}`}
							addStyle={{
								margin: '10px 0 0 0'
							}}
						/>
					</div>
					<div className="button_wrapp">
						<MyButton
							type="bag_link"
							runAction={() => {
								console.log('added to cart');
							}}
							title="View product"
							addStyle={{
								margin: '10px 0 0 0'
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
