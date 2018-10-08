const mysql = require('mysql');

exports.base = (sql, data, callback) => {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'llf12345',
        database: 'coffeeshop'
    });

    db.query(sql, data, (err, result) => {
        if (err) throw err;
        callback(result);
    })
}