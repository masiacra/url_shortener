/*
 * 
 * Обработчик запросов на статические файлы
 * 
 */

//Зависимости
const helpers = require('./helpers');
const path = require('path');
const fs = require('fs');

const staticFileDir = path.join(__dirname, '../static');

function gag(res) {
	res.end('sosi');
}


function readFavicon(res) {
	const npath = path.join(staticFileDir, 'favicon.ico');
	const stream = fs.createReadStream(npath);
	stream.pipe(res);
	return;
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
		readFavicon(res);
	} else if (npath === 'index.html') {
		helpers.readfile(path.join(staticFileDir, 'index.html'), 
			displayWrapper('html', res));
	} else if (npath === 'custom.css') {
		helpers.readfile(path.join(staticFileDir, 'custom.css'),
			displayWrapper('css', res));
	} else if (npath === 'script.js') {
		helpers.readfile(path.join(staticFileDir, 'script.js'),
			displayWrapper('js', res));	
	} else {
		helpers.readfile(path.join(staticFileDir, 'not_found.html'),
			displayWrapper('html', res));	
	}
};

module.exports = { 
	router 
};
