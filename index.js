const http = require('http');

const url = require('url');


const server = http.createServer( (req, res) => {
	const npath = url.parse(req.url).pathname;
	console.log(npath);
	if (~npath.indexOf('\0')) {
		res.statusCode = 400;
        res.end("Bad Request");
        return;
	} else if (npath === '/') {
		res.end('hello world');
	} else {
		res.writeHead(301, { "Location": "http://yandex.ru" });
        return res.end();
	}
});

server.listen(3000);


