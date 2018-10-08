const bodyParser = require('body-parser');
const db = require('../server/db');

exports.showindex = (req, res) => {
    console.log('dajsasdasd');
    if (req.url = '/') {
        res.render('index', {
            username: req.session.username,
            show: req.session == '1' ? true : false

        });
    }
    // if (req.session.login == "1") {
    //     res.render('index', { username: req.session.username })
    // }
}
exports.showLogin = (req, res) => {
    res.render('login');
}

exports.showRegister = (req, res) => {
    res.render('register');
}
exports.register = (req, res) => {
    let info = req.body;
    let data = {}
    for (const key in info) {
        if (key != 'password2') {
            data[key] = info[key]
        }

    }
    let sql = 'insert into user set ?';

    db.base(sql, data, (result) => {
        if (result.affectedRows == 1) {
            res.redirect('/index.html');
        }
    })
}

exports.doLogin = (req, res) => {
    let info = req.body;
    let sql = 'select * from user where email=?';
    let data = [info.email];
    db.base(sql, data, (result) => {
        if (result.length != 0) {
            if (result[0].password == info.password) {
                console.log(result[0].name);
                req.session.name = result[0].name;
                req.session.login = "1";

                res.redirect('./')

            }

        }

    })
}