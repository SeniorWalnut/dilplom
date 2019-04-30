const express = require('express');
const bParser = require('body-parser');
const pgp = require('pg-promise')();


const server = express();
const db = pgp("postgres://diplom_maker:qwerty@localhost:5432/skate_shop");

server.use(bParser.json());
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
  	next();
});

// SETTINGS
const LIMIT = 20;



// function _getQuantity(query) {
// 	return db.any(query)
// 		.then(data => data)
// 		.catch(err => {throw new Error(err)});
// }

function _getItems(req, res) {
	return db.any(req)
		.then(data => data)
		.catch(err => {throw new Error(err)});
}

function _filterItems(filterTypes) {
	let req = '(';

	let types = filterTypes.split(',');

	types.forEach((item, ind) => {
		req += (ind > 0 ? ' OR ' : '') + `product_type = '${item}'`;
	})

	return req + ')';
}

function _sortItems(sort) {
	return " ORDER BY " + sort[0] + (sort[1] === 'Down' ? ' DESC' : ''); 
}

function _findItem(item) {
	return (item.length ? ` name SIMILAR TO '${item}%'` : '');
}


// REQUESTS
server.get('/decks|wheels', (req, res) => {

	let pageType = `WHERE page_type = '${req.path.slice(1)}'`;

	let reqToDb = `${pageType} ${req.query.filter || req.query.item_name? 'AND' : ''}`;

	if (req.query.filter)
		reqToDb += _filterItems(req.query.filter) + (req.query.item_name ? ' AND ' : '');
	if (req.query.item_name) 
		reqToDb += _findItem(req.query.item_name);
	if (req.query.sort)
		reqToDb += _sortItems(req.query.sort);

	let curPage = req.query.cur_page;

	console.log(`SELECT * FROM product ${reqToDb} LIMIT ${LIMIT} OFFSET ${(curPage - 1) * LIMIT}`)

	Promise.all([
		_getItems(`SELECT COUNT(*) FROM product ${reqToDb}`),
		_getItems(`SELECT * FROM product ${reqToDb} LIMIT ${LIMIT} OFFSET ${(curPage - 1) * LIMIT}`),
		_getItems(`SELECT DISTINCT product_type FROM product ${pageType}`)
	]).then(data => {
		res.send({
			data: data
		})
	});
});
// server.get('/skates')


server.listen(3000);
console.log('server is running');
