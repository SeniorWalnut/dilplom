import React from 'react';
import CartProduct from './CartProduct';
import MainButton from './MainButton';

class Cart extends React.Component {
	constructor(props) {
		super(props);
	this.state = {
		showCart: false
	};

		this.products = this.props.products;

		this.handleCart = this.handleCart.bind(this);
		// this.clearAll = this.clearAll.bind(this);
	}

	handleCart() {
		this.setState(prevState => ({
			showCart: !prevState.showCart
		}))
	}

	render() {
		let products = this.props.products;
		return (
			<div className="cart">
				<div className="cart__icon" onClick={this.handleCart}></div>
				{this.state.showCart && <div className="cart-list" >
					{products.length ? 
					<div className="cart-list__wrapper-outter">
						<ul className="cart-list__wrapper">{products.map((item, ind) => {
								return (
									<li key={item + ind} className="cart-list__item">
										<CartProduct 
											obj={item}
											removeItem={() => {
												console.log('child')
												console.log(ind)
												this.props.removeItem(ind)}
											}/>
									</li>
								);
							})
						}</ul>
					</div>
					: <div className="cart-list__nothing">Здесь пока ничего нет :С</div>}
					<div className="cart__full-price"></div>	
					<div className="cart-buttons">
						<MainButton mod="buy" onClick={this.props.buyAll}>Купить</MainButton>
						<MainButton mod="clear-all" onClick={this.props.clearAll}>Убрать всё</MainButton>
					</div>
				</div>}
			</div>
		);
	}
};

export default Cart;