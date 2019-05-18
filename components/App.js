import React from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom'
import MainPage from './MainPage';
import Catalogue from './Catalogue';

const App = () => {
	return (
		<BrowserRouter>
			<Route exact path="/" component={MainPage}/>
			<Route path="/decks" component={Catalogue}/>
			<Route path="/wheels" component={Catalogue}/>
		</BrowserRouter>
	);
};

export default App;