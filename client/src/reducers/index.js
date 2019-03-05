import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import productsReducer from './products_reducer';
import siteReducer from './site_reducer';

const rootReducer = combineReducers({
	user: userReducer,
	products: productsReducer,
	site: siteReducer
});

export default rootReducer;
