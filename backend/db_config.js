const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'university_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;
