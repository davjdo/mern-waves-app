import axios from 'axios';
import { USER_LOGIN } from './types';
import { USER_SERVER } from '../components/utils/misc';

export function loginUser(dataToSubmit) {
	const request = axios
		.post(`${USER_SERVER}/login`, dataToSubmit)
		.then(response => response.data);
	return {
		type: USER_LOGIN,
		payload: request
	};
}
