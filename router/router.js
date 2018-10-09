const bodyParser = require('body-parser');
const db = require('../server/db');

//页面渲染
exports.showindex = (req, res) => {
    if (req.session.login == "1") {
        //如果登陆了
        var username = req.session.name;
        var login = true;
    } else {
        //没有登陆
        var username = ""; //制定一个空用户名
        var login = false;
    }

    res.render('index', {
        "username": username,
        "show": login
    });

    // if (req.session.login == "1") {
    //     res.render('index', { username: req.session.name })
    // }
}
exports.showLogin = (req, res) => {
    res.render('login', {
        "show": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.name : "",
    });
}

exports.showRegister = (req, res) => {
    res.render('register', {
        "show": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.name : "",
    });
}
exports.showCheckout = (req, res) => {
    res.render('checkout', {
        "show": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.name : "",
    })
}

exports.showOrder = (req, res) => {
    res.render('dingdan', {
        "show": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.name : "",
    })
}

exports.showMail = (req, res) => {
    res.render('mail', {
        "show": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.name : "",
    })
}

exports.showProducts = (req, res) => {
    res.render('products', {
        "show": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.name : "",
    })
}
exports.showSingle = (req, res) => {
    res.render('single', {
        "show": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.name : "",
    })
}


//数据接口
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
            res.redirect('/login');
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
                    console.log(req.session.name)
                    res.redirect('./')

                }

            }

        })
    }
    //退出登录
exports.doLogout = (req, res) => {
    if (req.session.login == "1") {
        delete req.session.login
        res.render('index', {
            "show": req.session.login == "1" ? true : false,
            "username": req.session.login == "1" ? req.session.name : "",
        })
    }

}