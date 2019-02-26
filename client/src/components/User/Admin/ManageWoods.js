import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import {
	update,
	generateData,
	isFormValid,
	resetFields
} from '../../utils/Form/FormActions';
import { connect } from 'react-redux';
import {
	getWoods,
	addWood,
	clearWood
} from '../../../actions/products_actions';

class ManageWoods extends Component {
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
					placeholder: 'Enter the wood'
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

	componentDidMount() {
		this.props.getWoods();
	}

	showCategoryItems = () =>
		this.props.products.woods
			? this.props.products.woods.map((item, i) => (
					<div className="category_item" key={item._id}>
						{item.name}
					</div>
			  ))
			: null;

	updateForm = element => {
		const newFormdata = update(element, this.state.formdata, 'Woods');
		this.setState({
			formError: false,
			formdata: newFormdata
		});
	};

	resetFieldHandler = () => {
		const newFormdata = resetFields(this.state.formdata, 'Woods');
		this.setState({
			formdata: newFormdata,
			formSuccess: true
		});
		setTimeout(() => {
			this.setState(
				{
					formSuccess: false
				},
				() => {
					this.props.clearWood();
				}
			);
		}, 3000);
	};

	submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formdata, 'Woods');
		let formIsValid = isFormValid(this.state.formdata, 'Woods');
		let existingWoods = this.props.products.woods;
		if (formIsValid) {
			this.props.addWood(dataToSubmit, existingWoods).then(response => {
				if (response.payload.success) {
					this.resetFieldHandler();
				} else {
					this.setState({ formError: true });
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
			<div className="admin_category_wrapper">
				<h1>Woods</h1>
				<div className="admin_two_column">
					<div className="left">
						<div className="brands_container">{this.showCategoryItems()}</div>
					</div>
					<div className="right">
						<form onSubmit={event => this.submitForm(event)}>
							<FormField
								id={'name'}
								formdata={this.state.formdata.name}
								change={element => this.updateForm(element)}
							/>
							{this.state.formSuccess ? (
								<div className="form_success">Success</div>
							) : null}
							{this.state.formError ? (
								<div className="error_label">Please check your data</div>
							) : null}
							<button onSubmit={event => this.submitForm(event)}>
								Add wood
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		products: state.products
	};
};

export default connect(
	mapStateToProps,
	{ getWoods, addWood, clearWood }
)(ManageWoods);
