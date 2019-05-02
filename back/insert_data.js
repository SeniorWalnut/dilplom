const fs = require('fs');
const pgp = require('pg-promise')();

const db = pgp("postgres://diplom_maker:qwerty@localhost:5432/skate_shop");

const jsons = [
	'Alien_Workshop',
	'Blind',
	'Darkstar',
	'Mini_Logo'
];

const pages = [
	'Wheels',
	'Decks'
];

pages.forEach(name => {
	jsons.forEach(item => {
		let obj = JSON.parse(fs.readFileSync(`../result/${name}/${item}.json`, 'utf-8'));
		if (obj.length) {
			let template = `INSERT INTO product(name, description, price, quantity, img, product_type, page_type) VALUES `;
			obj.forEach(item => {
				template += `('${item.name}', '${item.sub}', ${item.price}, ${item.quantity}, '${item.img}', '${item.product_type}', '${name.toLowerCase()}'), `;
			})

			template = template.slice(0, template.length - 2) + ';';
			db
				.none(template)
				.then(() => console.log('Done: ' + obj[0].product_type))
				.catch(err => { throw new Error(err) }); 
		}
	});
});