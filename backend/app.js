var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const saltRounds = 8;

var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'contact_tracing_system',
  user: 'root',
  password: ''
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// use database in middleware
app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
});
// use bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// use session
app.use(session({
  secret: 'an absolutely un-guessable secret',
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/Auth/Login', function(req, res, next) {
  // if already logged in, just return OK
  if (req.session.loggedIn === true) {
    res.sendStatus(200);
    return;
  }
  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var login = req.body.login;
    var password = req.body.password;
    if (login && password) {
      // var hashedPassword = bcrypt.hash(password, saltRounds);
      var queryString;
      if (!isNaN(login) && login.length === 10) {
        queryString = "SELECT * FROM user WHERE phoneNumber = ?;";
      } else {
        queryString = "SELECT * FROM user WHERE email = ?;";
      }
      connection.query(queryString, [login], function(err, rows, fields) {
        if (rows.length > 0) {
          if (bcrypt.compareSync(password, rows[0].password)) {
            req.session.loggedIn = true;
            req.session.userID = rows[0].userID;
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(400);
    }
  })
});
app.post('/Auth/Logout', function(req, res, next) {
  req.session.loggedIn = false;
  req.session.userID = '';
  res.sendStatus(200);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
