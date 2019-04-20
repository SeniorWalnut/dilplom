import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Item from './Item';
import Cart from './Cart';
import MainButton from './MainButton';

import images from '../assets/skate-images/alien_workshop/*.jpg';

const mainURL = 'http://localhost:3000/';
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
			typesOfProducts: [],
			params: {
				'sort': [],
				'filter': "",
				'item_name': ""
			},	
			productsInCart:[]
		};

		// Main
		this._pageType = window.location.pathname.slice(1);

		// Methods
		this.handleCheckboxes = this.handleCheckboxes.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.handleQuery = this.handleQuery.bind(this);
		// Temporary fields

		// Some Types
		this._typesOfSorts = [
			'price_Up',
			'price_Down',
			'quantity_Up',
			'quantity_Down'
		];
	}

	handleQuery() {
		axios.get(mainURL + this._pageType, {
			params: this.state.params
		})
		.then(data => {
			this.setState({fetchItems: data.data.data})
		})
		  .catch(err => {throw new Error(err)})

	}

	handleCheckboxes(ev) {
		let typesOfProducts = [...this.state.typesOfProducts],
		cur = typesOfProducts.find(i => ev.target.id === i.name);
		cur.checked = ev.target.checked;

		this.setState(prevState => ({
			...prevState.typesOfProducts,
			typesOfProducts
		}));

		let filters = this.state.typesOfProducts.filter(item => item.checked).map(i => i.name) + '';
		this.setState(prevState => ({
			params: {
				...prevState.params,
				'filter': filters
			}
		}));

		this.handleQuery();
	}


	handleSort(sortType) {
		let sort = sortType.target.id.split('_');
		this.setState(prevState => ({
			params: {
				...prevState.params,
				'sort': sort
			}
		}));

		this.handleQuery();
	}

	addToCart(item) {
		this.setState(prevState => ({
			productsInCart: [
				...prevState.productsInCart,
				item
			]
		}))
	}


	componentDidMount() {
		axios.get('http://localhost:3000/' + this._pageType)
			.then(data => { 
				let checkboxes = [...new Set(data.data.data.map(item => item.product_type))].map(item => {
					return {
						name: item,
						checked: false
					}
				});
				this.setState({
					fetchItems: data.data.data,
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
					<Cart products={this.state.productsInCart}/>
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
							 	return <li key={type + ind} id={type} onClick={this.handleSort}>{type}</li>
							})}
						</ul>
					</div>	
					<div className="catalogue-right">
						<div className="catalogue-right__top">
							<div className="skate-quantity">
								Количество Товара: {this.state.fetchItems.length}
							</div>
							<label className="search-field" >
								<div className="search-field__name">Введите название товара:</div>
								<input type="text" id="search" />
							</label>
						</div>
						<ul className="catalogue-items">{
								this.state.fetchItems.map((item, ind) => {
									return (
									<li onClick={() => this.addToCart(item)} key={item.name.slice(1, 5) + ind}>
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