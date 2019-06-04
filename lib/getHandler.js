/*
 * 
 * Обработчик запросов типа POST
 * 
 */

//Зависимости
const db = require('./DBimitation');
const staticFilesHandler = require('./staticFilesHandler');





function getRes(npath, res) {
	console.log(npath);
	db.getFromDB('SELECT longUrl FROM urls WHERE shortUrl = ' + 
		'\''+npath+'\'', (err, data) => {
			
		if (err) {
			console.log(err);
			return;
		}
		console.log('data=', data);
		if (data.length > 0) {
			res.writeHead(301, { "Location": data[0].longUrl });
			return res.end();
		} else {
			staticFilesHandler.router(npath, res);
		}
	}); 
}

module.exports = { getRes };

