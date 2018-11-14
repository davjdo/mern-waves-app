import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';
import './index.css';

const app = (
	<Provider store={store}>
		<Router>
			<Routes />
		</Router>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
