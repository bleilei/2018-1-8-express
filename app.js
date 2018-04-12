var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var lessMiddleware = require('less-middleware');
var route = require('./routes/route');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',require('ejs').renderFile);//读取html文件按html文件输出
app.set('view engine', 'html');

// app.engine('.html', require('ejs').__express);//读取html文件按ejs文件输出
// app.set('view engine', 'html');

app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//session存储,在生命周期内免登陆
app.use(session({
    secret : '12345',
    name : 'user',
    cookie : {maxAge : 24*60*60*1000},//-1会话级 关闭浏览器失效 0 不记录 （单位ms）
    resave : false,
    saveUninitialized : false,
    rolling:true
}));
//验证码
app.use(session({
    secret : '12345',
    name : 'vercode',
    cookie : {maxAge : 10*60*1000},//-1会话级 关闭浏览器失效 0 不记录 （单位ms）
    resave : false,
    saveUninitialized : false,
    rolling:true
}));
//图片临时
app.use(session({
    secret : '12345',
    name : 'uploadimg',
    cookie : {maxAge : 10*60*1000},//-1会话级 关闭浏览器失效 0 不记录 （单位ms）
    resave : false,
    saveUninitialized : false,
    rolling:true
}));
app.all('*', function(req, res, next) {
    //允许的来源
    res.header("Access-Control-Allow-Origin", "*");
    //允许的头部信息，如果自定义请求头，需要添加以下信息，允许列表可以根据需求添加
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    //允许的请求类型
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'publics')));
app.use(route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
