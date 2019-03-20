import React, { Component } from 'react';
import axios from 'axios';
import FormField from '../utils/Form/FormField';
import { update, generateData, isFormValid } from '../utils/Form/FormActions';

class ResetUser extends Component {
	state = {
		formError: false,
		formSuccess: false,
		formdata: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
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

	updateForm = element => {
		const newFormdata = update(element, this.state.formdata, 'ResetEmail');
		this.setState({
			formError: false,
			formdata: newFormdata
		});
	};

	submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formdata, 'ResetEmail');
		let formIsValid = isFormValid(this.state.formdata, 'ResetEmail');
		if (formIsValid) {
			axios.post('/api/users/reset_user', dataToSubmit).then(response => {
				if (response.data.success) {
					this.setState({ formSuccess: true });
					setTimeout(() => {
						this.setState({ formSuccess: false });
					}, 3000);
				} else {
					this.setState({
						formError: true
					});
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
			<div className="container">
				<h1>Reset password</h1>
				<form onSubmit={event => this.submitForm(event)}>
					<FormField
						id={'email'}
						formdata={this.state.formdata.email}
						change={element => this.updateForm(element)}
					/>
					{this.state.formError ? (
						<div className="error_label">This email is incorrect</div>
					) : null}
					{this.state.formSuccess ? (
						<div className="form_success">Done, check your email</div>
					) : null}
					<button onSubmit={event => this.submitForm(event)}>
						Send an email to reset password
					</button>
				</form>
			</div>
		);
	}
}

export default ResetUser;
