import React from 'react';

const FormField = ({ id, formdata, change }) => {
	const showError = () => {
		let errorMessage = null;
		if (formdata.validation && !formdata.valid) {
			errorMessage = (
				<div className="error_label">{formdata.validationMessage}</div>
			);
		}
		return errorMessage;
	};

	const renderTemplate = () => {
		let formTemplate = null;
		switch (formdata.element) {
			case 'input':
				formTemplate = (
					<div className="formBlock">
						<input
							{...formdata.config}
							value={formdata.value}
							onBlur={event => change({ id, event, blur: true })}
							onChange={event => change({ id, event })}
						/>
						{showError()}
					</div>
				);
				break;
			default:
				formTemplate = null;
		}
		return formTemplate;
	};

	return <div>{renderTemplate()}</div>;
};

export default FormField;
