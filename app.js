const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var ejs = require('ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
const router = require('./router/router');
var session = require('express-session');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//页面接口
app.get('/', router.showindex);
app.get('/login', router.showLogin);
app.get('/register', router.showRegister);
app.get('/products', router.showProducts);
app.get('/order', router.showOrder);
app.get('/mail', router.showMail);
app.get('/single', router.showSingle);
app.get('/checkout', router.showCheckout);

//数据接口
app.post('/register', router.register)
app.post('/login', router.doLogin)
app.get('/logout', router.doLogout);
app.listen(8080);