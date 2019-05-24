CREATE DATABASE url_shortener_DB;

USE url_shortener_DB;


CREATE TABLE urls (
longUrl VARCHAR(100) NOT NULL PRIMARY KEY,
shortUrl VARCHAR(100) NOT NULL
);

GRANT SELECT, INSERT, UPDATE ON url_shortener_DB.urls TO 'admin_cock'@'localhost';

Вход: mysql -u url_shortener -p

//Вставляем значения
INSERT INTO urls VALUES ('https://yandex.ru', 'aaa0000');

INSERT INTO urls VALUES ('https://google.com', 'aaa0001');
INSERT INTO urls VALUES ('https://vk.com', 'aaa0002');
