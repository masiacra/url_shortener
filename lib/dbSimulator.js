/*
 * 
 * 
 *Отладочный симулятор базы данных
 *  
 * 
*/
//Зависимости



//Контейнер для всех методов
simulatorDB = {};


//Имитируем таблицу
simulatorDB.straightTable = {
	'https://yandex.ru': 'aaa0000',
	'https://google.com': 'aaa0001',
	'https://vk.com': 'aaa0002'
};

simulatorDB.inverseTable = {
	'aaa0000': 'https://yandex.ru',
	'aaa0001': 'https://google.com',
	'aaa0002': 'https://vk.com'
};

//Метод get
//Выполянет запрос к базе данных на передачу определенных сведений
simulatorDB.get = (cb, tablename, urlName) => {
	tablename = typeof(tablename) === 'string' && tablename.length > 0 ?
		tablename : false;
	params = typeof(param) === 'object' && params instanceof Array ? 
		params.join(',') : '*';
	
	setTimeout(() => {
		console.log('Select url, shorten Url' + ' from ' + tablename);
		if (tablename === 'urls') {
			
		} else {
			cb(new Error('Отсутствует указанная таблица в БД');
		}
	}, 1000);
	 
};





module.exports = simulatorDB; 
