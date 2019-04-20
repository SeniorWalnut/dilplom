import React from 'react';
import CartProduct from './CartProduct';
import MainButton from './MainButton';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCart: false
		};

		this.handleCart = this.handleCart.bind(this);
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
					<ul className="cart-list__wrapper">{products ? products.map((item, ind) => {
							return (
								<li key={item + ind} className="cart-list__item">
									<CartProduct obj={item}/>
								</li>
							);
						})
					: <li className="cart-list__nothing">Здесь пока ничего нет :С</li>}
					</ul>
					<div className="cart__full-price"></div>	
					<div className="cart-buttons">
						<MainButton mod="buy">Купить</MainButton>
						<MainButton mod="clear-all">Убрать всё</MainButton>
					</div>
				</div>}
			</div>
		);
	}
};

export default Cart;