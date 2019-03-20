import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPass } from '../../actions/user_actions';
import FormField from '../utils/Form/FormField';
import { update, generateData, isFormValid } from '../utils/Form/FormActions';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText
} from '@material-ui/core';

class ResetPass extends Component {
	state = {
		resetToken: '',
		formError: false,
		formErrorMessage: '',
		formSuccess: '',
		formdata: {
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
			},
			confirmPassword: {
				element: 'input',
				value: '',
				config: {
					name: 'confirm_password_input',
					type: 'password',
					placeholder: 'Confirm your password'
				},
				validation: {
					required: true,
					confirm: 'password'
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		}
	};

	componentDidMount = () => {
		const resetToken = this.props.match.params.token;
		this.setState({ resetToken });
	};

	updateForm = element => {
		const newFormdata = update(element, this.state.formdata, 'ResetPass');
		this.setState({
			formError: false,
			formdata: newFormdata
		});
	};

	submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formdata, 'ResetPass');
		let formIsValid = isFormValid(this.state.formdata, 'ResetPass');
		if (formIsValid) {
			this.props
				.resetPass({
					...dataToSubmit,
					resetToken: this.state.resetToken
				})
				.then(response => {
					if (!response.payload.success) {
						this.setState({
							formError: true,
							formErrorMessage: response.payload.message
						});
					} else {
						this.setState({ formSuccess: true, formError: false });
						setTimeout(() => {
							this.props.history.push('/register_login');
						}, 3000);
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
				<form onSubmit={event => this.submitForm(event)}>
					<h2>Reset Password</h2>
					<div className="form_block_two">
						<div className="block">
							<FormField
								id={'password'}
								formdata={this.state.formdata.password}
								change={element => this.updateForm(element)}
							/>
						</div>
						<div className="block">
							<FormField
								id={'confirmPassword'}
								formdata={this.state.formdata.confirmPassword}
								change={element => this.updateForm(element)}
							/>
						</div>
					</div>
					{this.state.formError ? (
						<div className="error_label">{this.state.formErrorMessage}</div>
					) : (
						''
					)}
					<button onSubmit={event => this.submitForm(event)}>
						Reset password
					</button>
				</form>
				<Dialog open={this.state.formSuccess}>
					<DialogTitle>Alright !!</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Your password was reseted... you will be redirected
						</DialogContentText>
					</DialogContent>
				</Dialog>
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
	{ resetPass }
)(ResetPass);
