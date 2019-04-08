const express = require('express');

const server = express();

// server.use(express.static('pages'));

server.get('/', (req, res) => {
	res.send('Hello');
});

server.get('/skates', (req, res) => {
	res.send('it\'s note');
});

server.listen(3000);
console.log('server is running');