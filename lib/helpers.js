/*
 * 
 * Вспомогательные функции
 * 
 */

//Зависимости
const fs = require('fs');
const path = require('path');

//Container for all methods
const helpers = {};


//Метод readfile
helpers.readfile = (filepath, cb) => {
 
	fs.readFile(filepath, 'utf8', (err, data) => {
		if (err) {
			cb(err);
			return;
		}
		cb(null, data);
	});
};

//Метод writefile
helpers.writefile = (filename, data, cb) => {
	const filepath = path.join(__dirname,'../data', filename);
	fs.writeFile(filepath, data, (err) => {
		if (err) {
			cb(err);
			return;
		}
		console.log('Файл успешно записан');
		cb(null);
	});
};


//Метод cut
//Предоставляет функциональность для сокращения url
//Использует внешний файл данных для сохранения счетчика коротких url
helpers.cut = (cb) => {
	const filepath = path.join(__dirname,'../data', 'counters.json');
	helpers.readfile(filepath, (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		const counters = JSON.parse(data);
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		let result = '';
		let symb1 = counters.count1 + '';
		if (symb1.length < 4) {
			symb1 = '0'.repeat(4 - symb1.length) + symb1;
		} 
		const symb2 = alphabet[counters.count2];
		const symb3 = alphabet[counters.count3];
		const symb4 = alphabet[counters.count4];
		counters.count1++;
		if (counters.count1 > 9999) {
			counters.count1 = 0;
			counters.count2++;
			if (counters.count2 > 25) {
				counters.count2 = 0;
				counters.count3++;
				if (counters.count3 > 25) {
					counters.count3 = 0;
					counters.count4++;
				}
			}
		}
		helpers.writefile(filepath, JSON.stringify(counters), 
			(err, data) => {
			if (err) {
				cb(err);
				return; 
			}
			cb(null, `${symb4}${symb3}${symb2}${symb1}`);
		});
	});
};


//Метод для парсинга JSON
helpers.parseJsonToObject = buffer => {
	let data;
	try {
		data = JSON.parse(buffer);
	} catch(e) {
		data = {};
	}
	return data;
};


//Проверка входящего URL
//Будем делать запрос на указанный url, если вернется статус от 0 до 400,
//то адрес валиден
helpers.is_url = (url, cb) => {
	let protocol;
	if (!/^http(s)?:\/\//i.test(url)) {
		url = 'http://' + url;
		protocol = 'http';
	} else {
		protocol = url.match(/^http(s)?/i)[0];
	}
	const reg = new RegExp('^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(\/.*)?$', 
		'i');
	if (!reg.test(url)) {
		cb(new Error('URL is invalid'));
		return;
	}
	require(protocol).get(url, res => {
		const statusCode = res.statusCode;
		if (statusCode > 0 && statusCode < 400) {
			cb(null);
		} else { 
			cb(new Error('URL is invalid'));
		}
	}).on('error', e => {
		cb(e);
	});
};



module.exports = helpers;
