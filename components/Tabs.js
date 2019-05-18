import React from 'react';
import Catalogue from './Catalogue'
import { Link } from "react-router-dom";

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0
		}

		this.changeTab = this.changeTab.bind(this);
	}

	changeTab(ind) {
		this.setState({ activeTab: ind });
	}

	render() {
		return (
			<ul className="tabs">
				{this.props.tabs.map((tab, ind) => {
					return (
					<Link 
						to={'/' + this.props.tabs[ind]}
						key={tab + ind}
						className={"tabs__tab " + (window.location.pathname.slice(1) === tab ? "active" : '')}
						onClick={() => this.changeTab(ind)}
						>
					{tab}
					</Link>
					);
				})}
			</ul>
		);
	}
}

export default Tabs;