/*
 * 
 * Обработчик запросов типа POST
 * 
 */

//Зависимости
const db = require('./db');
const helpers = require('./helpers');
const StringDecoder = require('string_decoder').StringDecoder;


function postRes(req, res) {
	const decoder = new StringDecoder('utf-8');
	let buffer = '';
	req.on('data', data => {
		buffer += decoder.write(data);
	});
	req.on('end', () => {
		buffer += decoder.end();
		console.log(helpers.parseJsonToObject(buffer));
		res.end();
	});

}


module.exports = { postRes };
