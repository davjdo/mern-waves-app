import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../utils/Form/FormField';
import {
	update,
	generateData,
	isFormValid,
	populateOptionFields,
	resetFields
} from '../../utils/Form/FormActions';
import FileUpload from '../../utils/Form/FileUpload';
import { connect } from 'react-redux';
import {
	getBrands,
	getWoods,
	addProduct,
	clearProduct
} from '../../../actions/products_actions';
class AddProduct extends Component {
	state = {
		formError: false,
		formSuccess: false,
		formdata: {
			name: {
				element: 'input',
				value: '',
				config: {
					label: 'Product name',
					name: 'name_input',
					type: 'text',
					placeholder: 'Enter your name'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			description: {
				element: 'textarea',
				value: '',
				config: {
					label: 'Product description',
					name: 'description_input',
					type: 'text',
					placeholder: 'Enter your description'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			price: {
				element: 'input',
				value: '',
				config: {
					label: 'Product price',
					name: 'price_input',
					type: 'number',
					placeholder: 'Enter your price'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			brand: {
				element: 'select',
				value: '',
				config: {
					label: 'Product Brand',
					name: 'brands_input',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			shipping: {
				element: 'select',
				value: '',
				config: {
					label: 'Shipping',
					name: 'shipping_input',
					options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			available: {
				element: 'select',
				value: '',
				config: {
					label: 'Available, in stock',
					name: 'available_input',
					options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			wood: {
				element: 'select',
				value: '',
				config: {
					label: 'Wood material',
					name: 'wood_input',
					options: []
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			frets: {
				element: 'select',
				value: '',
				config: {
					label: 'Frets',
					name: 'frets_input',
					options: [
						{ key: '20', value: '20' },
						{ key: '21', value: '21' },
						{ key: '22', value: '22' },
						{ key: '24', value: '24' }
					]
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			publish: {
				element: 'select',
				value: '',
				config: {
					label: 'Publish',
					name: 'publish_input',
					options: [
						{ key: true, value: 'Public' },
						{ key: false, value: 'Hidden' }
					]
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: '',
				showLabel: true
			},
			images: {
				value: [],
				validation: {
					required: false
				},
				valid: true,
				touched: false,
				validationMessage: '',
				showLabel: false
			}
		}
	};

	componentDidMount() {
		const formdata = this.state.formdata;
		this.props.getBrands().then(response => {
			const newFormdata = populateOptionFields(
				formdata,
				this.props.products.brands,
				'brand'
			);
			this.updateFields(newFormdata);
		});

		this.props.getWoods().then(response => {
			const newFormdata = populateOptionFields(
				formdata,
				this.props.products.woods,
				'wood'
			);
			this.updateFields(newFormdata);
		});
	}

	updateFields = newFormdata => {
		this.setState({ formdata: newFormdata });
	};

	updateForm = element => {
		const newFormdata = update(element, this.state.formdata, 'Products');
		this.setState({
			formError: false,
			formdata: newFormdata
		});
	};

	resetFieldHandler = () => {
		const newFormdata = resetFields(this.state.formdata, 'Products');
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
					this.props.clearProduct();
				}
			);
		}, 3000);
	};

	submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(this.state.formdata, 'Products');
		let formIsValid = isFormValid(this.state.formdata, 'Products');
		if (formIsValid) {
			this.props.addProduct(dataToSubmit).then(response => {
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

	imagesHandler = images => {
		const newFormdata = {
			...this.state.formdata
		};
		newFormdata['images'].value = images;
		newFormdata['images'].valid = true;
		this.setState({
			formdata: newFormdata
		});
	};

	render() {
		return (
			<UserLayout>
				<div>
					<h1>Add Product</h1>
					<form onSubmit={event => this.submitForm(event)}>
						<FileUpload
							imagesHandler={images => this.imagesHandler(images)}
							reset={this.state.formSuccess}
						/>

						<FormField
							id={'name'}
							formdata={this.state.formdata.name}
							change={element => this.updateForm(element)}
						/>
						<FormField
							id={'description'}
							formdata={this.state.formdata.description}
							change={element => this.updateForm(element)}
						/>
						<FormField
							id={'price'}
							formdata={this.state.formdata.price}
							change={element => this.updateForm(element)}
						/>
						<div className="form_divider" />
						<FormField
							id={'brand'}
							formdata={this.state.formdata.brand}
							change={element => this.updateForm(element)}
						/>
						<FormField
							id={'shipping'}
							formdata={this.state.formdata.shipping}
							change={element => this.updateForm(element)}
						/>
						<FormField
							id={'available'}
							formdata={this.state.formdata.available}
							change={element => this.updateForm(element)}
						/>
						<div className="form_divider" />
						<FormField
							id={'wood'}
							formdata={this.state.formdata.wood}
							change={element => this.updateForm(element)}
						/>
						<FormField
							id={'frets'}
							formdata={this.state.formdata.frets}
							change={element => this.updateForm(element)}
						/>
						<div className="form_divider" />
						<FormField
							id={'publish'}
							formdata={this.state.formdata.publish}
							change={element => this.updateForm(element)}
						/>
						{this.state.formSuccess ? (
							<div className="form_success">Success</div>
						) : null}
						{this.state.formError ? (
							<div className="error_label">Please check your data</div>
						) : null}
						<button onSubmit={event => this.submitForm(event)}>
							Add product
						</button>
					</form>
				</div>
			</UserLayout>
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
	{ getBrands, getWoods, addProduct, clearProduct }
)(AddProduct);
