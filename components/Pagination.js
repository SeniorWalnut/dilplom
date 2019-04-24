import React from 'react';

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {curPage: 1};
		this.changePage = this.changePage.bind(this);
		this.createPagination = this.createPagination.bind(this);
	}

	changePage(num) {
		this.props.fetchPage(num);
	}

	createPagination(num) {
		let res = [];
		for (let i = 0; i < num; i++)
			res.push(
				<li 
					className="main-pagination__page" 
					key={'list' + i} 
					onClick={() => this.changePage(i + 1)}
					>{i + 1}
				</li>
			);
		return res;
	}

	render() {
		return (	
			<ul className="main-pagination">
				{this.createPagination(this.props.pages)}
			</ul>
		);
	}
}

export default Pagination;