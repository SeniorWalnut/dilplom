import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Item from './Item';

import images from '../assets/skate-images/alien_workshop/*.jpg';
// console.log(images);
		// <h1>{window.location.pathname}</h1>
class Catalogue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			curItem: '',
			nothingFound: '',
			onError: false,
			fetchItems: [],
			allItems: [],
			typesOfProducts: []
			// currentProducts: []
		};

		// Main
		this._pageType = window.location.pathname.slice(1);

		// Methods
		// this.clearItems = this.clearItems.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleCheckboxes = this.handleCheckboxes.bind(this);
		// this.sortProducts = this.sortProducts.bind(this);
		// this.handleBrand = this.handleBrand.bind(this);
		// Temporary fields

		// Some Types
		this._typesOfSorts = [
			'priceUp',
			'priceDown',
			'quantityUp',
			'quantityDown'
		];
	}

	handleCheckboxes(ev) {
		let type = this.state.typesOfProducts.find(i => ev.target.id === i.name);
		type.checked = ev.target.checked;

		this.handleSearch();
	}

	handleSearch(ev) {
		var itemName =  ev ? ev.target.value.trim() : " ";

		// this.setState({curItem: itemName})
		let filtered;
		let checked = this.state.typesOfProducts.map(pr =>{if (pr.checked) return pr.name}).filter(i => i !== undefined);
		console.log(checked)
		let checkboxed = checked.length ? this.state.fetchItems.filter(i => checked.includes(i.product_type)) : this.state.fetchItems;

		if (itemName.length !== 0 && itemName !== ' ') {
			var react = this;
			
			filtered = checkboxed
				.filter((item) => { return (
					item.name.toLowerCase().startsWith(itemName.toLowerCase()))
			});

			if (checked.length)
				filtered = filtered.filter(item => checked.includes(item.product_type))
		} else {
			filtered = checkboxed;
		}
		
		this.setState({ allItems: filtered })
	}

	// sortProducts(type) {
	// 	var types = {
	// 		"priceUp": function(a, b) {return +a.price - +b.price},
	// 		"priceDown": function(a, b) {return +b.price - +a.price},
	// 		"quantityUp": function(a, b) { return +a.quantity - +b.quantity},
	// 		"quantityDown": function(a, b) { return +b.quantity - +a.quantity}
	// 	};

	// 	let sorted = this.state.fetchItems.sort(item => { return types[type]; });
	// 	this.setState({allItems: sorted})
	// }

	componentDidMount() {
		axios
			.get('http://localhost:3000/' + this._pageType)
			.then(data => { 
				let checkboxes = [...new Set(data.data.data.map(item => item.product_type))].map(item => {
					return {
						name: item,
						checked: false
					}
				});
				this.setState({
					fetchItems: data.data.data, 
					allItems: data.data.data,
					typesOfProducts: checkboxes
				})
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
							{this.state.typesOfProducts.map((type, ind) => {
								return (
									<li key={type + ind}>
										<input type="checkbox" id={type.name} onChange={this.handleCheckboxes}/>
										<label htmlFor={type.name}>{type.name}</label>
									</li>
								); 
									
							})}
						</ul>
						<h1 className="catalogue-subtitle">
							SORT BY:
						</h1>
						<ul className="sort-button">
							{this._typesOfSorts.map((type, ind) => {
								return <li key={type + ind}>{type}</li>
							})}
						</ul>
					</div>	
					<div className="catalogue-right">
						<div className="catalogue-right__top">
							<div className="skate-quantity">
								Количество Товара: {this.state.allItems.length}
							</div>
							<label className="search-field" >
								<div className="search-field__name">Введите название товара:</div>
								<input type="text" id="search" onChange={this.handleSearch}/>
							</label>
						</div>
						<ul className="catalogue-items">{
								this.state.allItems.map((item, ind) => {
									return (
									<li key={item.name.slice(1, 5) + ind}>
										<Item
											src={item.img}
											title={item.name}
											price={item.price}
											info={item.description}	
										></Item>
									</li>);
								})
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Catalogue);