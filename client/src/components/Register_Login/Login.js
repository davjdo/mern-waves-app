import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';
import FormField from '../utils/Form/FormField';
import { update, generateData, isFormValid } from '../utils/Form/FormActions';

class Login extends Component {
	state = {
		formError: false,
		formSuccess: '',
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
			},
			password: {
				element: 'input',
				value: '',
				config: {
					name: 'password_input',
					type: 'password',
					placeholder: 'Enter your password'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		}
	};

	updateForm = element => {
		const newFormdata = update(element, this.state.formdata, 'Login');
		this.setState({
			formError: false,
			formdata: newFormdata
		});
	};

	submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formdata, 'Login');
		let formIsValid = isFormValid(this.state.formdata, 'Login');
		if (formIsValid) {
			this.props.loginUser(dataToSubmit).then(response => {
				if (response.payload.loginSuccess) {
					this.props.history.push('/user/dashboard');
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
			<div className="signin_wrapper">
				<form onSubmit={event => this.submitForm(event)}>
					<FormField
						id={'email'}
						formdata={this.state.formdata.email}
						change={element => this.updateForm(element)}
					/>
					<FormField
						id={'password'}
						formdata={this.state.formdata.password}
						change={element => this.updateForm(element)}
					/>
					{this.state.formError ? (
						<div className="error_label">Please check your data</div>
					) : null}
					<button onClick={event => this.submitForm(event)}>Login</button>
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
	{ loginUser }
)(withRouter(Login));
