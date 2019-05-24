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
helpers.parseJsonToObject = str => {
	try {
		const obj = JSON.parse(str);
		return obj;
	} catch(e) {
		return {};
	}
};



module.exports = helpers;
