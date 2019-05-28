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
			helpers.is_url(url, (err, url) => {
				if (err) {
					res.statusCode = 406;
					res.end(JSON.stringify('saske'));
					return;
				} else {
					db.getFromDB('SELECT shortUrl FROM urls WHERE longUrl=' +
						'\'' + url + '\'', (err, data) => {
						
						if (err) {
							console.log(err);
							res.statusCode = 500;
							res.end();
							return;
						}
						
						if (data.length > 0) {
							console.log(data[0].shortUrl);
							const rec = {
								longUrl: url,
								shortUrl: data[0].shortUrl
							};
							res.end(JSON.stringify(rec));
							return;
						} else {
							helpers.cut( (err, data) => {
								if (err) {
									console.log(err);
									return;
								}
								const rec = { 
									longUrl: url,
									shortUrl: data
								};
								db.addToDB('INSERT INTO urls SET ?', rec,
									(err, result) => {
								
									if (err) {
										res.statusCode =  500;
										res.end();
										return;
									}
									res.statusCode = 200;
									console.log(JSON.stringify(rec));
									res.end(JSON.stringify(rec));
								
								});
							});
						}

					}); 
				}

			});
		} else {
			res.end();
		}

	});

}






module.exports = { postRes };
