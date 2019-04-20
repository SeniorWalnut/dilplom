const express = require('express');
const bParser = require('body-parser');
var cors = require('cors');
const pgp = require('pg-promise')();

const server = express();
const db = pgp("postgres://diplom_maker:qwerty@localhost:5432/skate_shop");

server.use(cors())
server.use(bParser.json());

function _getEverything(res) {
	_getItems('SELECT * FROM product', res);
}

function _getItems(req, res) {
	db.any(req)
		.then(data => res.status(200).json({'data': data}))
		.catch(err => {throw new Error(err)});
}

function _filterItems(filterTypes) {
	let req = "";

	let types = filterTypes.split(',');

	req += ' WHERE ';

	types.forEach((item, ind) => {
		req += (ind > 0 ? ' OR ' : '') + `product_type = '${item}'`;
	})
	console.log(req)
	return req;
}

function _sortItems(sort) {
	return " ORDER BY " + sort[0] + (sort[1] === 'Down' ? ' desc' : ''); 
}

// function _findElem(elem) {
// 	return ` AND name = ${elem}`;
// }


// REQUESTS
server.get('/skates',(req, res) => {
	let reqToDb = '';

	if (req.query.filter)
		reqToDb += _filterItems(req.query.filter);
	if (req.query.sort)
		reqToDb += _sortItems(req.query.sort);

	_getItems('SELECT * FROM product' + reqToDb, res);
});
// server.get('/skates')


server.listen(3000);
console.log('server is running');
