import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MainPage from './MainPage';
import Catalogue from './Catalogue';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={MainPage}/>
				<Route path="/decks" component={Catalogue}/>
				<Route path="/wheels" component={Catalogue}/>
			</Switch>
		</BrowserRouter>
	);
};

export default App;