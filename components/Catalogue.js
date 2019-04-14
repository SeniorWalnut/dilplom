import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Item from './Item';

import images from '../assets/skate-images/darkstar/*.jpg';
console.log(images);
		// <h1>{window.location.pathname}</h1>

class Catalogue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemName: '',
			nothingFound: '',
			onError: false
		};

		this.fetchItems = [];

		// Main
		this._pageType = window.location.pathname.slice(1);

		// Methods
		// this.getItems = this.getItems.bind(this);
		this.findItem = this.findItem.bind(this);
		// Temporary fields
		this._quantityOfSkates = this.fetchItems.length;

		this._typesOfItems = [
			'darkstar',
			'deathwish',
			'spitfire'
		];
		this._typesOfSorts = [
			'priceUp',
			'priceDown',
			'priceQuantityUp',
			'priceQuantityDown',
		];
	}

	findItem(val) {
		let item = this.fetchItems.find(name => name);
		if (item)
			return item 
		else {
			this.setState({
				nothingFound: true
			})
			return; 
		}	
	}

	getItems(type) {		
		fetch('https://localhost:3000/' + type)
			.then(chunk => chunk.json())
			.then(data => {
				this.fetchItems = data;
			})
			.catch(err => {
				this.setState({
					onError: true
				})
			})
	}

	render() {
		return (
			<div className="catalogue">
				<div className="catalogue-header">
					<a href="#" className="catalogue-title">JSk</a>
					<a href="#" className="catalogue-basket"></a>
				</div>
				<div className="catalogue-wrapper">
					<div className="catalogue-left">
						<h1 className="catalogue-subtitle">
							BRANDS:
						</h1>
						<ul className="catalogue-brand">
							{this._typesOfItems.map((type, ind) => {
								return (
									<li>
										<input type="checkbox" id={type+ind}/>
										<label key={type + ind} for={type+ind}>{type}</label>
									</li>
								); 
									
							})}
						</ul>
					</div>	
					<div className="catalogue-right">
						<div className="catalogue-right__top">
							<div className="skate-quantity">
								Количество Товара: {this._quantityOfSkates}
							</div>
							<ul className="sort-button">
								{this._typesOfSorts.map((type, ind) => {
									<li key={type + ind}>{type}</li>
								})}
							</ul>
							<label className="search-field" >
								<div className="search-field__name">Введите название товара:</div>
								<input type="text" id="search" onChange={this.itemName}/>
							</label>
						</div>
						<ul className="catalogue-items">
							<Item 
								src={images[Object.keys(images)[0]]}
								title="Beauty"
								info="Some info about this beautiful creature, created by my hands"
								price="3990$"
							/>
							<Item 
								src={images[Object.keys(images)[1]]}
								title="Not"
								info="Some info about this beautiful creature, created by my hands"
								price="3990$"
							/>
							<Item 
								src={images[Object.keys(images)[0]]}
								title="Beauty"
								info="Some info about this beautiful creature, created by my hands"
								price="3990$"
							/>
							<Item 
								src={images[Object.keys(images)[1]]}
								title="Not"
								info="Some info about this beautiful creature, created by my hands"
								price="3990$"
							/>
							<Item 
								src={images[Object.keys(images)[0]]}
								title="Beauty"
								info="Some info about this beautiful creature, created by my hands"
								price="3990$"
							/>
							<Item 
								src={images[Object.keys(images)[1]]}
								title="Not"
								info="Some info about this beautiful creature, created by my hands"
								price="3990$"
							/>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Catalogue);