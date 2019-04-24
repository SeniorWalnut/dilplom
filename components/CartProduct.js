import React from 'react';
import MainButton from './MainButton';

import images from '../assets/skate-images/*.jpg';

const CartProduct = (props) => {
	let item = props.obj;
	return (

		<div className="cart-product">
			<div className="cart-product__left">
				<img src={images[item.img.split('/')[3]]} className="cart-product__pic" />
			</div>
			<div className="cart-product__right">
				<div className="cart-product__name">{item.name}</div>
				<div className="cart-product__desc">{item.description}</div>
				<div className="cart-product__price">{item.price}</div>
			</div>
			
			<MainButton mod="cancel" onClick={props.removeItem}></MainButton>
		</div>
	);
};

export default CartProduct;