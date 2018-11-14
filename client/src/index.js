import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const app = (
	<Router>
		<Routes />
	</Router>
);

ReactDOM.render(app, document.getElementById('root'));
