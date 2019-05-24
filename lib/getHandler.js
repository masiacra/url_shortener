/*
 * 
 * Обработчик запросов типа POST
 * 
 */

//Зависимости
const db = require('./db');
const helpers = require('./helpers');


function getRes(npath, res) {
	
	db.getFromDB('SELECT longUrl FROM urls WHERE shortUrl = ' + 
		'\''+npath+'\'', (err, data) => {
			
		if (err) {
			console.log(err);
			return;
		}
		console.log(data);
		if (data.length > 0) {
			res.writeHead(301, { "Location": data[0].longUrl });
			return res.end();
		} else {
			res.write('404');
			res.end();
		}
	}); 
}

module.exports = { getRes };

