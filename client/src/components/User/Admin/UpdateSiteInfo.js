import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import {
	update,
	generateData,
	isFormValid,
	populateFields
} from '../../utils/Form/FormActions';
import { getSiteData, updateSiteData } from '../../../actions/site_actions';
import { connect } from 'react-redux';

class UpdateSiteInfo extends Component {
	state = {
		formSuccess: false,
		formError: false,
		formdata: {
			address: {
				element: 'input',
				value: '',
				config: {
					label: 'Address',
					name: 'address_input',
					type: 'text',
					placeholder: 'Enter the site address'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			hours: {
				element: 'input',
				value: '',
				config: {
					label: 'Working hours',
					name: 'hours_input',
					type: 'text',
					placeholder: 'Enter the site working hours'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			phone: {
				element: 'input',
				value: '',
				config: {
					label: 'Phone number',
					name: 'phone_input',
					type: 'text',
					placeholder: 'Enter the site phone number'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			email: {
				element: 'input',
				value: '',
				config: {
					label: 'Email',
					name: 'email_input',
					type: 'text',
					placeholder: 'Enter the site email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			}
		}
	};

	componentDidMount() {
		this.props.getSiteData().then(response => {
			const newFormdata = populateFields(
				this.state.formdata,
				this.props.site.siteData[0]
			);
			this.updateFields(newFormdata);
		});
	}

	updateFields = newFormdata => {
		this.setState({ formdata: newFormdata });
	};

	updateForm = element => {
		const newFormdata = update(element, this.state.formdata, 'SiteInfo');
		this.setState({
			formError: false,
			formdata: newFormdata
		});
	};

	submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formdata, 'SiteInfo');
		let formIsValid = isFormValid(this.state.formdata, 'SiteInfo');
		if (formIsValid) {
			this.props.updateSiteData(dataToSubmit).then(response => {
				if (response.payload.success) {
					this.setState(
						{
							formSuccess: true
						},
						() => {
							setTimeout(() => {
								this.setState({ formSuccess: false });
							}, 2000);
						}
					);
				}
			});
		} else {
			this.setState({
				formError: true
			});
		}
	};

	render() {
		return (
			<div>
				<form onSubmit={event => this.submitForm(event)}>
					<h1>Site Information</h1>
					<FormField
						id={'address'}
						formdata={this.state.formdata.address}
						change={element => this.updateForm(element)}
					/>
					<FormField
						id={'hours'}
						formdata={this.state.formdata.hours}
						change={element => this.updateForm(element)}
					/>
					<FormField
						id={'phone'}
						formdata={this.state.formdata.phone}
						change={element => this.updateForm(element)}
					/>
					<FormField
						id={'email'}
						formdata={this.state.formdata.email}
						change={element => this.updateForm(element)}
					/>
					<div>
						{this.state.formSuccess ? (
							<div className="form_success">Success</div>
						) : null}
						{this.state.formError ? (
							<div className="error_label">Please check your data</div>
						) : null}
						<button onSubmit={event => this.submitForm(event)}>
							Update site information
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		site: state.site
	};
};

export default connect(
	mapStateToProps,
	{ getSiteData, updateSiteData }
)(UpdateSiteInfo);
