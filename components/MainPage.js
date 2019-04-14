import React from 'react';
import videos from '../assets/skate.mp4';
import { withRouter, Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Catalogue from './Catalogue';

const ROUTES = [
	{route: 'skates', icon: '../assets/icons/skateboard.svg'},
	{route: 'wheels', icon: '../assets/icons/car-wheel.svg'},
	{route: 'scooters', icon: '../assets/icons/scooter.svg'}
];

class MainPage extends React.Component {

	render() {
		return (
				<div className="main-page">
					<video autoPlay loop>
						<source src={videos} type="video/mp4" />
					</video>
					<main className="main-header">
						<div className="main-header__title">Just <span>Sk</span>ate</div>
					<div className="main-menu">
						{ROUTES.map((item, num) => {
							return (
								<Link to={"/" + item.route} key={item.route + num} className="main-menu__type">
									<p>{item.route.toUpperCase()}</p>
								</Link>
							);
						})}
					</div>
					</main>

				<Router>
					<Route path="/skates" component={Catalogue}/>
					<Route path="/wheels" component={Catalogue}/>
					<Route path="/skooters" component={Catalogue}/>
				</Router>
			</div>
		);
	}
};

export default withRouter(MainPage);