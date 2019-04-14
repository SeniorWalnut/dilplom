const express = require('express');
const pgp = require('pg-promise')();

const server = express();
const db = pgp("postgres://diplom_maker:qwerty@localhost:5432/skate_shop");
// server.use(express.static('pages'));

db.one('SELECT * FROM product');

server.get('/skates', (req, res) => {

});

server.listen(3000);
