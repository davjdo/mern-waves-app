import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

class PageNotFound extends Component {
	componentDidMount() {
		this.redirectToHome();
	}

	redirectToHome = () => {
		setTimeout(() => {
			this.props.history.push('/');
		}, 2000);
	};

	render() {
		return (
			<div className="container">
				<div className="not_found_container">
					<FontAwesomeIcon icon={faExclamationCircle} />
					<div>Ooops !! page not found</div>
				</div>
			</div>
		);
	}
}

export default PageNotFound;
