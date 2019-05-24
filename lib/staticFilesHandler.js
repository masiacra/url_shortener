/*
 * 
 * Обработчик запросов на статические файлы
 * 
 */

//Зависимости
const helpers = require('./helpers');
const path = require('path');


const staticFileDir = path.join(__dirname, '../static');

function gag(res) {
	res.end('sosi');
}


function displayWrapper(type, res) {
	
	return display;
	
	function display(err, data) {
		if (err) {
			console.log(err);
			res.write('400');
			return;
		}
		res.writeHeader(200, displayWrapper.headers[type]);
		res.write(data);
		res.end();
	}
}

displayWrapper.headers = {
	'js': {"Content-Type": 'text/javascript'},
	'html': {"Content-Type": 'text/html'},
	'css': {"Content-Type": 'text/css'}
};



const router = (npath, res) => {
	if (npath === 'favicon.ico') {
		gag(res);
	} else if (npath === 'index.html') {
		helpers.readfile(path.join(staticFileDir, 'index.html'), 
			displayWrapper('html', res));
	} else if (npath === 'custom.css') {
		helpers.readfile(path.join(staticFileDir, 'custom.css'),
			displayWrapper('css', res))
	} else {
		gag(res);
	}
};

module.exports = { 
	router 
};
