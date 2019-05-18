// Main
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { Route, BrowserRouter } from 'react-router-dom';
// Styles
import '../sass/main.sass';

ReactDOM.render((
	<BrowserRouter>
		<Route path="/" component={App}/>
	</BrowserRouter>
	),
document.getElementById('app'));