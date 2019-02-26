import React from 'react';
import UserLayout from '../../../hoc/UserLayout';
import ManageBrands from '../Admin/ManageBrands';
import ManageWoods from '../Admin/ManageWoods';

const ManageCategories = () => {
	return (
		<UserLayout>
			<ManageBrands />
			<ManageWoods />
		</UserLayout>
	);
};

export default ManageCategories;
