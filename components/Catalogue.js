import React from 'react';
import { withRouter } from "react-router-dom";

		// <h1>{window.location.pathname}</h1>
class Catalogue extends React.Component {
	constructor(props) {
		super(props);

		this.fetchItems = [];

		// Main
		this._pageType = window.location.pathname.slice(1);

		// Methods
		// this.getItems = this.getItems.bind(this);

		// Temporary fields
		this.quantityOfSkates;
		this.typesOfItems = [
			'darkstar',
			'deathwish',
			'spitfire'
		];
		this.typesOfSorts = [
			'priceUp',
			'priceDown',
			'priceQuantityUp',
			'priceQuantityDown',
		];
	}

	// async getItems(type) {
	// 	switch(type) {
	// 		case 'skates':

	// 	}
	// }

	// componentDidMount() {
	// 	this.fetchItems = await fetch(this._pageType);
	// }

	render() {
		return (
			<div className="catalogue">
				<div className="catalogue-header">
					<a href="#" className="catalogue-title">JSk</a>
					<ul className="catalogue-menu">

					</ul>
				</div>
				<div className="catalogue-wrapper">
					<div className="catalogue-left">
						<ul className="catalogue-brand">
							{this.typesOfItems.map((type, ind) => {
								return (
								<label key={type + ind}>
									<input type="checkbox"/>{type}
								</label>
								); 
									
							})}
						</ul>
					</div>	
					<div className="catalogue-right">
						<div className="skate-quantity">
							{this.quantityOfSkates}
						</div>
						<ul className="sort-button">
							{this.typesOfSorts.map((type, ind) => {
								<li key={type + ind}>{type}</li>
							})}
						</ul>
						<div className="search-field">
							<input type="text" id="search"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Catalogue);