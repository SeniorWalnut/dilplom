const fs = require('fs');
const pgp = require('pg-promise')();

const db = pgp("postgres://diplom_maker:qwerty@localhost:5432/skate_shop");

const jsons = [
	'Alien_Workshop',
	'Blind',
	'Darkstar'	
];

jsons.forEach(item => {
	let obj = JSON.parse(fs.readFileSync(`./result/${item}.json`, 'utf-8'));
	// console.log(obj[0]);
	let template = `INSERT INTO product(name, description, price, quantity, img, product_type, page_type) VALUES `;
	obj.forEach(item => {
		template += `('${item.name}', '${item.sub}', '${item.price}', ${item.quantity}, '${item.img}', '${item.product_type}', 'skate'), `;
	})
	template = template.slice(0, template.length - 2) + ';';
	// console.log(template);
	db
		.none(template)
		.then(() => console.log('Done: ' + obj[0].product_type))
		.catch(err => { throw new Error(err) }); 
});
