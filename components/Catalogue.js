import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Item from './Item';
import Cart from './Cart';
import MainButton from './MainButton';
import Pagination from './Pagination';

import images from '../assets/skate-images/*.jpg';

console.log(images)

const mainURL = 'http://localhost:3000/';

const LIMIT = 20;
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
				'item_name': "",
				'cur_page': 1
			},	
			productsInCart:[],
			fullPrice: 0,
			showBuyMessage: false,
			itemsQuantity: 0,
			page: {
				activeInd: 1,
				pagesNum: 1
			}
		};

		// Main
		this._pageType = window.location.pathname.slice(1);
		// Methods
		this.handleCheckboxes = this.handleCheckboxes.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handlePage = this.handlePage.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.handleQuery = this.handleQuery.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.buyAll = this.buyAll.bind(this);
		this.closeMessage = this.closeMessage.bind(this);

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
			this.setState({
				fetchItems: data.data.data[1],
				itemsQuantity: +data.data.data[0][0].count
			}) 
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
		this.handleQuery()

		let types =  this.state.fetchItems.map(item => item['product_type'])

		this.setState({
			typesOfProducts: types
		})
	}

	clearAll() {
		this.setState({
			productsInCart: []
		})
	}

	buyAll() {
		if (this.state.productsInCart.length) {
			let price = this.state.productsInCart.reduce((sum, cur) => {
				return sum + parseFloat(cur.price.slice(1, ));
			}, 0)


			this.setState({
				fullPrice: price,
				showBuyMessage: true,
				productsInCart: []
			})

		}
	}

	removeItem(ind) {
		let newProds = [
			...this.state.productsInCart.slice(0, ind), 
			...this.state.productsInCart.slice(ind + 1, )
		];
		this.setState({
			productsInCart: newProds
		})
	}

	closeMessage() {
		this.setState({
			showBuyMessage: false
		})
	}

	handlePage(val) {
		console.log(val)
		this.setState(prevState => ({
			params: {
				...prevState.params,
				'cur_page': val
			}
		} 
		))
		this.handleQuery();
	}


	render() {
		return (
			<div className="catalogue">
				<div className="catalogue-header">
					<a href="#" className="catalogue-title">JSk</a>
					<Cart 
						products={this.state.productsInCart}
						clearAll={this.clearAll}
						removeItem={this.removeItem}
						buyAll={this.buyAll}/>
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
								Количество Товара: {this.state.itemsQuantity}
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
											src={images[item.img.split('/')[3]]}
											title={item.name}
											price={item.price}
											info={item.description}	
										></Item>
									</li>);
								})
							}
						</ul>
						<Pagination 
							pages={Math.ceil(this.state.itemsQuantity / LIMIT)}
							fetchPage={this.handlePage}
						/>
					</div>
				</div>
				{this.state.showBuyMessage && <div className="buy-message">
					<p>Ваш заказ на сумму: <b>{this.state.fullPrice}$</b></p>
					<p>Наш агент свяжется с вами</p>
					<MainButton onClick={this.closeMessage}>Закрыть</MainButton>
				</div>}
			</div>
		);
	}
}

export default withRouter(Catalogue);