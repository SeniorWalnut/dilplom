import React from 'react';
import { withRouter } from "react-router-dom";

const Item = (props) => {
	return (
		<div className="item">
			<div className="item-title">{props.title}</div>
			<div className="item-main">
				<img src={props.src} alt="IMG" className="item-main__img"/>
				<div className="item-main__info">{props.info}</div>
			</div>
			<div className="item-price">{props.price}</div>
		</div>
	);
}

export default Item;
