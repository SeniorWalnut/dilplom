const express = require('express');
const bParser = require('body-parser');
var cors = require('cors');
const pgp = require('pg-promise')();


const server = express();
const db = pgp("postgres://diplom_maker:qwerty@localhost:5432/skate_shop");

// server.use(cors({
// 	maxAge: 600
// }));
server.use(bParser.json());
server.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

// SETTINGS
const LIMIT = 20;

// function _getEverything(res) {
// 	_getItems('SELECT * FROM product', res);
// }


function _getWholeQuantity() {
	return db.any('SELECT COUNT(*) FROM product')
		.then(data => data)
		.catch(err => {throw new Error(err)});
}

function _getItems(req, res) {
	return db.any(req)
		.then(data => data)
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
	return " ORDER BY " + sort[0] + (sort[1] === 'Down' ? ' DESC' : ''); 
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

	let curPage = req.query.cur_page;


	console.log(`SELECT * FROM product ${reqToDb} LIMIT ${LIMIT} OFFSET ${(curPage - 1)* LIMIT}`)

	Promise.all([
		_getWholeQuantity(),
		_getItems(`SELECT * FROM product ${reqToDb} LIMIT ${LIMIT} OFFSET ${(curPage - 1)* LIMIT}`)
	]).then(data => {
		res.status(200).json({
			data: data
		})
	});
});
// server.get('/skates')


server.listen(3000);
console.log('server is running');
