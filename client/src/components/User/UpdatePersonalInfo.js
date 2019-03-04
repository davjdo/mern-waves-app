import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import {
	update,
	generateData,
	isFormValid,
	populateFields
} from '../utils/Form/FormActions';
import { updateUserData, clearUpdateUser } from '../../actions/user_actions';
import { connect } from 'react-redux';

class UpdatePersonalInfo extends Component {
	state = {
		formError: false,
		formSuccess: false,
		formdata: {
			name: {
				element: 'input',
				value: '',
				config: {
					name: 'name_input',
					type: 'text',
					placeholder: 'Enter your name'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			lastName: {
				element: 'input',
				value: '',
				config: {
					name: 'lastName_input',
					type: 'text',
					placeholder: 'Enter your last name'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'text',
					placeholder: 'Enter your email'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		}
	};

	componentDidMount() {
		const newFormdata = populateFields(
			this.state.formdata,
			this.props.user.userData
		);
		this.updateFields(newFormdata);
	}

	updateFields = newFormdata => {
		this.setState({ formdata: newFormdata });
	};

	updateForm = element => {
		const newFormdata = update(element, this.state.formdata, 'UpdateProfile');
		this.setState({
			formError: false,
			formdata: newFormdata
		});
	};

	submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formdata, 'UpdateProfile');
		let formIsValid = isFormValid(this.state.formdata, 'UpdateProfile');
		if (formIsValid) {
			console.log(dataToSubmit);
			this.props.updateUserData(dataToSubmit).then(response => {
				if (response.payload.success) {
					this.setState(
						{
							formSuccess: true
						},
						() => {
							setTimeout(() => {
								this.props.clearUpdateUser();
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
					<h2>Personal Information</h2>
					<div className="form_block_two">
						<div className="block">
							<FormField
								id={'name'}
								formdata={this.state.formdata.name}
								change={element => this.updateForm(element)}
							/>
						</div>
						<div className="block">
							<FormField
								id={'lastName'}
								formdata={this.state.formdata.lastName}
								change={element => this.updateForm(element)}
							/>
						</div>
					</div>
					<div>
						<FormField
							id={'email'}
							formdata={this.state.formdata.email}
							change={element => this.updateForm(element)}
						/>
					</div>
					<div>
						{this.state.formSuccess ? (
							<div className="form_success">Success</div>
						) : null}
						{this.state.formError ? (
							<div className="error_label">Please check your data</div>
						) : null}
						<button onSubmit={event => this.submitForm(event)}>
							Update personal info
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(
	mapStateToProps,
	{ updateUserData, clearUpdateUser }
)(UpdatePersonalInfo);
