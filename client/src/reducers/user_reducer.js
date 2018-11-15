import { USER_LOGIN } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				loginSuccess: action.payload
			};
		default:
			return state;
	}
}
