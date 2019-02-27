import React, { Component } from 'react';
import Lightbox from 'react-images';

class ImageLightbox extends Component {
	state = {
		lightboxIsOpen: true,
		currentImage: this.props.pos,
		images: []
	};

	static getDerivedStateFromProps(props, state) {
		if (props.images) {
			const images = [];
			props.images.forEach(element => {
				images.push({
					src: `${element}`
				});
			});
			return (state = {
				images
			});
		}
		return null;
	}

	goToPrevious = () => {
		this.setState({
			currentImage: this.state.currentImage - 1
		});
	};

	goToNext = () => {
		this.setState({
			currentImage: this.state.currentImage + 1
		});
	};

	closeLightbox = () => {
		this.props.onClose();
	};

	render() {
		return (
			<Lightbox
				currentImage={this.state.currentImage}
				images={this.state.images}
				isOpen={this.state.lightboxIsOpen}
				onClickPrev={() => this.goToPrevious()}
				onClickNext={() => this.goToNext()}
				onClose={() => this.closeLightbox()}
			/>
		);
	}
}

export default ImageLightbox;
