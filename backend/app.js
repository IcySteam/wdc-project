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
var passport = require('passport');
var GoogleUserProfile;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '1007071025898-tm7jhgcq17u2goi17ireghg8c77gb4la.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'cT967vU--K_jZD3zO7eqrVRc';

// dumb proxy to integrate frontend and backend
const frontend_port = '8081';
const backend_port = '3000';
const proxy_port = '8080';
const httpProxy = require('http-proxy');
const url = require('url');
const proxy = httpProxy.createProxy();
const proxyOptions = {
  //frontend routes
  '/': 'http://localhost:' + frontend_port,
  '/favicon.ico': 'http://localhost:' + frontend_port,
  '/js': 'http://localhost:' + frontend_port,
  '/img': 'http://localhost:' + frontend_port,
  '/fonts': 'http://localhost:' + frontend_port,
  '/LoremIpsum': 'http://localhost:' + frontend_port,
  '/Default/Home': 'http://localhost:' + frontend_port,
  '/Default/About': 'http://localhost:' + frontend_port,
  '/User/Home': 'http://localhost:' + frontend_port,
  '/User/Account': 'http://localhost:' + frontend_port,
  '/Auth/SignUp': 'http://localhost:' + frontend_port,
  '/Auth/Login': 'http://localhost:' + frontend_port,
  '/Manager/Home': 'http://localhost:' + frontend_port,
  '/Manager/Account': 'http://localhost:' + frontend_port,
  '/Admin/Home': 'http://localhost:' + frontend_port,
  '/Admin/Account': 'http://localhost:' + frontend_port,
  '/Admin/Administration': 'http://localhost:' + frontend_port,

  // backend routes
  // /Action handled by regex
}
require('http').createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  for (const [pattern, dest] of Object.entries(proxyOptions)) {
    if (pathname === pattern ||
        pathname.startsWith(pattern + '/')
    ) {
      proxy.web(req, res, {target: dest});
    }
  }
  // forward to frontend if no matches
  // universal solution DOESN'T WORK, breaks shit
  // FFS
  // using case-by-case regexp
  var actionRegex = new RegExp("^\\/Action\\/.*");
  var hotUpdateRegex = new RegExp("^\\/(.)*[a-z0-9]{20}\\.hot\\-update\\.js(on){0,1}(\\/){0,1}$"); // Vue.js hot update js
  if (actionRegex.test(pathname)) {
    let fallbackDest = 'http://localhost:' + backend_port;
    proxy.web(req, res, {target: fallbackDest});
  }
  else if (hotUpdateRegex.test(pathname)) {
    let fallbackDest = 'http://localhost:' + frontend_port;
    proxy.web(req, res, {target: fallbackDest});
  }
}).listen(parseInt(proxy_port));

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

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // Google auth callback url; DEPENDENT ON ENVIRONMENT
      // callbackURL: 'https://ide-8c045c49c48c4ffb8cbf416d2ea89fd8-8080.cs50.ws/Action/GoogleAuth/Callback'
      callbackURL: 'http://localhost:' + proxy_port + '/Action/GoogleAuth/Callback'
    },
    function(accessToken, refreshToken, profile, done) {
      // set last user profile to obtained user profile; potentially unsafe and could break when multiple users try to log in at the same time
      GoogleUserProfile = profile;
      return done(null, GoogleUserProfile);
    }
));

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

app.post('/Action/Login', function(req, res, next) {
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
app.post('/Action/Logout', function(req, res, next) {
  req.session.loggedIn = false;
  req.session.userID = null;
  res.sendStatus(200);
});
app.get('/Action/GetSessionStatus', function(req, res, next) {
  var resObj = {
    "userID": null,
    "loggedIn": false
  }
  if(req.session.loggedIn) {
    resObj.loggedIn = true;
    resObj.userID = req.session.userID;
  }
  res.json(resObj);
});

// dev purposes only \/
// app.get('/Action/GoogleAuth/GetGoogleUserProfile', (req, res) => res.send(GoogleUserProfile));
// dev purposes only /\
app.get('/Action/GoogleAuth',
    passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/Action/GoogleAuth/Failure',
    function(req, res) {
      res.sendStatus(401);
    })
app.get('/Action/GoogleAuth/Callback',
    // redirect to error on failure
    passport.authenticate('google', { failureRedirect: '/Action/GoogleAuth/Failure' }),
    // Successful authentication; check db and respond accordingly
    function(req, res) {
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
        if (GoogleUserProfile) {
          var userEmail = GoogleUserProfile.emails[0].value;
          var queryString;
          queryString = "SELECT * FROM user WHERE email = ?;";
          connection.query(queryString, [userEmail], function(err, rows, fields) {
            if (rows.length > 0) {
                req.session.loggedIn = true;
                req.session.userID = rows[0].userID;
                res.sendStatus(200);
            } else {
              res.sendStatus(401);
            }
          });
        } else {
          res.sendStatus(520);
        }
      })
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
