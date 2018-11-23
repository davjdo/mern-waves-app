import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/Button';
import FeaturedHome from '../../assets/images/featured/featured_home.jpg';
import FeaturedHome2 from '../../assets/images/featured/featured_home_2.jpg';

const HomeSlider = props => {
	const slides = [
		{
			img: FeaturedHome,
			lineOne: 'Fender',
			lineTwo: 'Custom Shop',
			linkTitle: 'Shop now',
			linkTo: '/shop'
		},
		{
			img: FeaturedHome2,
			lineOne: 'B-Stock',
			lineTwo: 'Awesome discounts',
			linkTitle: 'View offers',
			linkTo: '/shop'
		}
	];

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	};

	const generateSlides = () =>
		slides
			? slides.map((slide, i) => (
					<div key={i}>
						<div
							className="featured_image"
							style={{
								background: `url(${slide.img})`,
								height: `${window.innerHeight}px`
							}}
						>
							<div className="featured_action">
								<div className="tag title">{slide.lineOne}</div>
								<div className="tag low_title">{slide.lineTwo}</div>
								<div>
									<MyButton
										type="default"
										title={slide.linkTitle}
										linkTo={slide.linkTo}
										addStyles={{
											margin: '10px 0 0 0'
										}}
									/>
								</div>
							</div>
						</div>
					</div>
			  ))
			: null;

	return (
		<div className="featured_container" style={{ marginBottom: '-5px' }}>
			<Slider {...settings}>{generateSlides()}</Slider>
		</div>
	);
};

export default HomeSlider;
