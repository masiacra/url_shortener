/*
 * 
 * Инициализирующий сервер скрипт
 * 
 */ 


//Зависимости
const http = require('http');
const url = require('url');
const postHandler = require('./lib/postHandler');
const getHandler = require('./lib/getHandler');
const staticFilesHandler = require('./lib/staticFilesHandler');



const server = http.createServer( (req, res) => {
	const npath = url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '');
	console.log(npath);
	if (~npath.indexOf('\0')) {
		res.statusCode = 400;
        res.end("Bad Request");
        return;
	} else if (npath === '' && req.method === 'GET') {
		staticFilesHandler.router('index.html', res);
	} else if (npath === '' && req.method === 'POST') {
		postHandler.postRes(req, res);
	} else if (/\./.test(npath)) {
		staticFilesHandler.router(npath, res);
	} else {
		getHandler.getRes(npath, res);
	}
});

server.listen(3000, () => {
	console.log('Сервер слушает на порту 3000');
});


