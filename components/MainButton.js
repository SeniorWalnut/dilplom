import React from 'react';

const MainButton = (props) => {
	return <button className={"main-button " + (props.mod ? "main-button_" + props.mod : '')}>
		{props.children}
	</button>	
}

export default MainButton;