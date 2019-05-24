/*
 * 
 * 
 *Модуль для работы с mysql
 *  
 * 
*/

//Зависимости
const mysql = require('mysql');


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'admin_cock',
	password: 'parol',
	database: 'url_shortener_DB'
});


//Метод get
//Выполянет запрос к базе данных на передачу определенных сведений
function getFromDB(query, cb) {
	connection.query(query, (err, results) => {
		if (err) { 
			cb(err);
			return;
		}
		cb(null, results);
	});
}


//Метод post

function addToDB(query, obj, cb) {
	connection.query(query,  obj, (err, res) => {
			if (err) {
				cb(err);
				return;
			}
			cb(null, res);
	});
}





module.exports = { 
	getFromDB,
	addToDB
};
