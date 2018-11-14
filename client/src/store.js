import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import rootReducer from './reducers';

const middleware = [reduxThunk, reduxPromise];

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middleware))
);

export default store;
