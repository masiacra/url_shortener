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
		//Если данных слишком много(~~~~1Mb), то прекращем соединение
		if (buffer.length > 1e6) {
			req.connection.destroy();
		}
	});
	req.on('end', () => {
		buffer += decoder.end();
		const obj = helpers.parseJsonToObject(buffer);
		console.log(obj);
		const url = obj["longUrl"]; 
		if (url) {
			helpers.is_url(url, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Ok');
				}
				res.end();
			});
		} else {
			res.end();
		}

	});

}





module.exports = { postRes };
