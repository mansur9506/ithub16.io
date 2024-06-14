// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // стандартный пользователь MySQL
    password: '',           // пароль MySQL (оставьте пустым, если пароля нет)
    database: 'laptop_rentals'
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.stack);
        return;
    }
    console.log('Подключено к базе данных');
});

module.exports = connection;