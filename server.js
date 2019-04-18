const express = require('express');
var cors = require('cors');
const pgp = require('pg-promise')();

const server = express();
const db = pgp("postgres://diplom_maker:qwerty@localhost:5432/skate_shop");

server.use(cors())

server.get('/skates',(req, res) => {
	db.any("select * from product where page_type = 'skate'")
		.then(data => res.status(200).json({data: data}))
		.catch(err => { throw new Error(err) })
});

server.listen(3000);
console.log('server is running');
