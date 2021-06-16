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
var crypto = require("crypto");
const emailRegExp = new RegExp("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,24}))$");


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
  '/Auth/Logout': 'http://localhost:' + backend_port,
}
var proxyServer = require('http').createServer((req, res) => {
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
  var fallbackDest;
  if (actionRegex.test(pathname)) {
    fallbackDest = 'http://localhost:' + backend_port;
    proxy.web(req, res, {target: fallbackDest});
  }
  else if (hotUpdateRegex.test(pathname)) {
    fallbackDest = 'http://localhost:' + frontend_port;
    proxy.web(req, res, {target: fallbackDest});
  }
}).listen(parseInt(proxy_port));

proxyServer.on('error', function (err) {
  // Handle your error here
  console.log(err);
});
// make express not quit on uncaught exception (e.g. when frontend hasn't started => connection_refused)
process.on('uncaughtException', function( err ) {
  console.error(err.stack);
});

var dbConnectionPool = mysql.createPool({
  database: 'contact_tracing_system',
  // host: 'localhost',
  // user: 'root',
  // password: '',
  host: '34.151.109.78',
  user: 'root',
  password: 'wdc2021',
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
      // callbackURL: 'http://localhost:' + proxy_port + '/Action/GoogleAuth/Callback'
      callbackURL: 'https://ide-8c045c49c48c4ffb8cbf416d2ea89fd8-8080.cs50.ws/Action/GoogleAuth/Callback'
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
  // if already logged in
  if (req.session.loggedIn === true) {
    let resPayload = "You are already logged in as UID#" + req.session.userID + ". Log out first to continue.";
    res.send(resPayload);
    return;
  }
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var login = req.body.login;
    var password = req.body.password;
    if (login && password) {
      login = login.toLowerCase();
      // var hashedPassword = bcrypt.hashSync(password, saltRounds);
      var queryString;
      if (!isNaN(login) && login.length === 10) {
        queryString = "SELECT * FROM user WHERE phoneNumber = ?;";
      } else {
        queryString = "SELECT * FROM user WHERE email = ?;";
      }
      connection.query(queryString, [login], function(err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        if (rows.length > 0) {
          if (bcrypt.compareSync(password, rows[0].password)) {
            req.session.loggedIn = true;
            req.session.userID = rows[0].userID.toLowerCase();
            req.session.usermode = rows[0].usermode.toLowerCase();
            if (req.session.usermode === 'manager') {
              req.session.associatedVenue = rows[0].associatedVenue;
            }
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
app.post('/Action/SignUp', function(req, res, next) {
  // takes json object with STRING values
  // if missing really mandatory fields
  if (!req.body.password || !req.body.email || !req.body.phoneNumber || req.body.password.length < 8 ||!emailRegExp.test(req.body.email) || isNaN(req.body.phoneNumber) || req.body.phoneNumber.length !== 10) {
    res.sendStatus(400);
    return;
  }

  var newUserID;
  if (req.body.userID && req.body.userID.length >= 6) {
    newUserID = req.body.userID.toLowerCase();
  } else {
    // generate userID if not satisfactorily supplied
    // 1 in 2,821,109,907,456 chance of collision; skipping checking
    newUserID = crypto.randomBytes(4).toString('hex');
  }

  // NEED to query db and change usermode according to registration code accordingly
  var usermode = 'user';
  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    // synchronous hash function used!
    var hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    var queryString;
    // skipping inserting registration code
    queryString = "INSERT INTO `user` (`userID`, `firstName`, `lastName`, `phoneNumber`, `email`, `gender`, `password`, `DOB`, `usermode`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    connection.query(queryString, [newUserID, (req.body.firstName && req.body.firstName.length > 0)? req.body.firstName : null, (req.body.lastName && req.body.lastName.length > 0)? req.body.lastName : null, req.body.phoneNumber, req.body.email, (req.body.gender && req.body.gender.length > 0)? req.body.gender : null, hashedPassword, (req.body.DOB && req.body.DOB.length > 0)? req.body.DOB : null, usermode], function(err, rows, fields) {
      connection.release();
      if (err) {
        console.log(err);
        // 520 unknown error; failing at insertion or other errors
        res.sendStatus(520);
        return;
      }
      res.sendStatus(200);
    });
  })
});
app.get('/Auth/Logout', function(req, res, next) {
  req.session.loggedIn = false;
  req.session.userID = null;
  req.session.usermode = 'none';
  req.session.associatedVenue = null;
  // res.sendStatus(200);
  res.redirect('/');
});
app.get('/Action/GetSessionStatus', function(req, res, next) {
  var resObj = {
    "userID": null,
    "loggedIn": false,
    "usermode": 'none'
  }
  if(req.session.loggedIn) {
    resObj.loggedIn = true;
    resObj.userID = req.session.userID.toLowerCase();
    resObj.usermode = req.session.usermode.toLowerCase();
    if (req.session.associatedVenue !== null) {
      resObj.associatedVenue = req.session.associatedVenue;
    }
  }
  res.json(resObj);
});

app.get('/Action/GetUser', function(req, res) {
  if (!req.query.userID) {
    res.sendStatus(400);
    return;
  }
  const targetUser = req.query.userID.toLowerCase();
  // console.log(targetUser)
  if (req.session.usermode !== 'admin' && targetUser !== req.session.userID) {
    res.sendStatus(401);
    return;
  }
  // Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     // for error details
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM user WHERE user.userID = ?;";
    connection.query(query, [targetUser], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      // not sending the password nope
      rows[0].password = null;
      res.json(rows[0]); // send first obj as response
    });
  });
});
app.post('/Action/UpdateUser', function(req, res, next) {
  // takes json object with STRING values
  if (!req.query.userID) {
    res.sendStatus(400);
    return;
  }
  const targetUser = req.query.userID.toLowerCase();
  // console.log(targetUser)
  if (req.session.usermode !== 'admin' && targetUser !== req.session.userID) {
    res.sendStatus(401);
    return;
  }

  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var updated = false;
    if (req.body.firstName && req.body.firstName.length > 0) {
      // updated should be moved into query but because async is trouble it is placed here for now
      updated = true;
      connection.query("UPDATE user SET user.firstName = ? WHERE user.userID = ?;", [req.body.firstName, targetUser], function(err, rows, fields) {
        // do not release connection here
        if (err) {
          console.log(err);
          // 520 unknown error; failing at insertion or other errors
          // res.sendStatus(520);
          // return;
        }
        // do nothing else for now
      });
    }
    if (req.body.lastName && req.body.lastName.length > 0) {
      updated = true;
      connection.query("UPDATE user SET user.lastName = ? WHERE user.userID = ?;", [req.body.lastName, targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.gender && req.body.gender.length > 0) {
      updated = true;
      connection.query("UPDATE user SET user.gender = ? WHERE user.userID = ?;", [req.body.gender.toLowerCase(), targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    // NEED TO add verification for changing phone number
    if (req.body.phoneNumber && !isNaN(req.body.phoneNumber) && req.body.phoneNumber.length === 10) {
      updated = true;
      connection.query("UPDATE user SET user.phoneNumber = ? WHERE user.userID = ?;", [req.body.phoneNumber, targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    // NEED TO add verification for changing email
    if (req.body.email && emailRegExp.test(req.body.email)) {
      updated = true;
      connection.query("UPDATE user SET user.email = ? WHERE user.userID = ?;", [req.body.email.toLowerCase(), targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.DOB && !isNaN(req.body.DOB) && req.body.DOB.length === 8) {
      updated = true;
      connection.query("UPDATE user SET user.DOB = ? WHERE user.userID = ?;", [req.body.DOB, targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.associatedVenue && req.body.associatedVenue.length > 0 && req.session.usermode === 'admin') {
      updated = true;
      connection.query("UPDATE user SET user.associatedVenue = ? WHERE user.userID = ?;", [req.body.associatedVenue.toLowerCase(), targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.userID && req.body.userID.length >= 6 && req.session.usermode === 'admin') {
      updated = true;
      connection.query("UPDATE user SET user.userID = ? WHERE user.userID = ?;", [req.body.userID.toLowerCase(), targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.usermode && (req.body.usermode.toLowerCase() === 'user' || req.body.usermode.toLowerCase() === 'manager' || req.body.usermode.toLowerCase() === 'admin') && req.session.usermode === 'admin' && targetUser !== req.session.userID) {
      updated = true;
      connection.query("UPDATE user SET user.usermode = ? WHERE user.userID = ?;", [req.body.usermode.toLowerCase(), targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.allowGoogleLogin && (req.body.allowGoogleLogin.toLowerCase() === 'yes' || req.body.allowGoogleLogin.toLowerCase() === 'no')) {
      updated = true;
      connection.query("UPDATE user SET user.allowGoogleLogin = ? WHERE user.userID = ?;", [req.body.allowGoogleLogin.toLowerCase(), targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.password && req.body.password.length >= 8) {
      updated = true;
      // synchronous hash function used!
      var hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      connection.query("UPDATE user SET user.password = ? WHERE user.userID = ?;", [hashedPassword, targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (updated) {
      connection.query("UPDATE user SET user.updateTimestamp = current_timestamp() WHERE user.userID = ?;", [targetUser], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }

    // finally release and respond
    connection.release();
    res.sendStatus(200);
  })
});
app.get('/Action/GetVenueObject', function(req, res) {
  if (!req.query.venueID) {
    res.sendStatus(400);
    return;
  }
  const targetVenue = req.query.venueID.toLowerCase();
  // console.log(venueID)
  // need to check permission first... or just give perm to all if just viewing?

  // Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     // for error details
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM venue WHERE venue.venueID = ?;";
    connection.query(query, [targetVenue], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows[0]); // send first obj as response
    });
  });
});
app.post('/Action/UpdateVenueObject', function(req, res, next) {
  // takes json object with STRING values
  if (!req.query.venueID) {
    res.sendStatus(400);
    return;
  }
  const targetVenue = req.query.venueID.toLowerCase();
  // console.log(targetVenue)
  if (req.session.usermode !== 'admin' && targetVenue !== req.session.associatedVenue) {
    res.sendStatus(401);
    return;
  }

  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var updated = false;
    if (req.body.name && req.body.name.length > 0) {
      // updated should be moved into query but because async is trouble it is placed here for now
      updated = true;
      connection.query("UPDATE venue SET venue.name = ? WHERE venue.venueID = ?;", [req.body.name, targetVenue], function(err, rows, fields) {
        // do not release connection here
        if (err) {
          console.log(err);
          // 520 unknown error; failing at insertion or other errors
          // res.sendStatus(520);
          // return;
        }
        // do nothing else for now
      });
    }
    // NEED TO add verification for changing phone number
    if (req.body.phoneNumber && !isNaN(req.body.phoneNumber) && req.body.phoneNumber.length === 10) {
      updated = true;
      connection.query("UPDATE venue SET venue.phoneNumber = ? WHERE venue.venueID = ?;", [req.body.phoneNumber, targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    // NEED TO add verification for changing email
    if (req.body.email && emailRegExp.test(req.body.email)) {
      updated = true;
      connection.query("UPDATE venue SET venue.email = ? WHERE venue.venueID = ?;", [req.body.email.toLowerCase(), targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.associatedManager && req.body.associatedManager.length > 0 && req.session.usermode === 'admin') {
      updated = true;
      connection.query("UPDATE venue SET venue.associatedManager = ? WHERE venue.venueID = ?;", [req.body.associatedManager.toLowerCase(), targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.venueID && req.body.venueID.length >= 6 && req.session.usermode === 'admin') {
      updated = true;
      connection.query("UPDATE venue SET venue.venueID = ? WHERE venue.venueID = ?;", [req.body.venueID.toLowerCase(), targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.latitude && !isNaN(req.body.latitude) && req.body.latitude.length > 0) {
      updated = true;
      connection.query("UPDATE venue SET venue.latitude = ? WHERE venue.venueID = ?;", [req.body.latitude, targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.longitude && !isNaN(req.body.longitude) && req.body.longitude.length > 0) {
      updated = true;
      connection.query("UPDATE venue SET venue.longitude = ? WHERE venue.venueID = ?;", [req.body.longitude, targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (req.body.radius && !isNaN(req.body.radius) && parseFloat(req.body.radius) > 0) {
      updated = true;
      connection.query("UPDATE venue SET venue.radius = ? WHERE venue.venueID = ?;", [req.body.radius, targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }
    if (updated) {
      connection.query("UPDATE venue SET venue.updateTimestamp = current_timestamp() WHERE venue.venueID = ?;", [targetVenue], function(err, rows, fields) {
        if (err) {
          console.log(err);
          // res.sendStatus(520);
          // return;
        }
      });
    }

    // finally release
    connection.release();
    res.sendStatus(200);
  })
});
app.post('/Action/CreateVenueObject', function(req, res, next) {
  // takes json object with STRING values
  if (req.session.usermode !== 'admin') {
    res.sendStatus(401);
    return;
  }
  // if missing really mandatory fields
  if (!req.body.latitude || !req.body.longitude || !req.body.radius || isNaN(req.body.latitude) || isNaN(req.body.longitude) || isNaN(req.body.radius) || req.body.radius <= 0) {
    res.sendStatus(400);
    return;
  }

  var newVenueID;
  if (req.body.venueID && req.body.venueID.length >= 6) {
    newVenueID = req.body.venueID.toLowerCase();
  } else {
    // generate venueID if not satisfactorily supplied
    // 1 in 2,821,109,907,456 chance of collision; skipping checking
    newVenueID = crypto.randomBytes(4).toString('hex');
  }

  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var queryString;
    queryString = "INSERT INTO `venue` (`venueID`, `name`, `phoneNumber`, `email`, `associatedManager`, `latitude`, `longitude`, `radius`, `createdBy`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    connection.query(queryString, [newVenueID, (req.body.name && req.body.name.length > 0)? req.body.name : null, (req.body.phoneNumber && !isNaN(req.body.phoneNumber))? req.body.phoneNumber : null, (req.body.email && emailRegExp.test(req.body.email))? req.body.email.toLowerCase() : null, (req.body.associatedManager && req.body.associatedManager.length > 0)? req.body.associatedManager.toLowerCase() : null, req.body.latitude, req.body.longitude, req.body.radius, req.session.userID], function(err, rows, fields) {
      connection.release();
      if (err) {
        console.log(err);
        // 520 unknown error; failing at insertion or other errors
        res.sendStatus(520);
        return;
      }
      res.sendStatus(200);
    });
  })
});

app.get('/Action/CheckIn', function(req, res, next) {
  // takes json object with STRING values
  // if not logged in
  if (!req.session.loggedIn) {
    res.redirect(401, '/Auth/Login')
    return;
  }
  // if missing really mandatory fields
  if (!req.query.checkInCode) {
    res.sendStatus(400);
    return;
  }
  var checkInCode = req.query.checkInCode.toLowerCase();
  var checkInLatitude;
  var checkInLongitude;

  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var queryString;
    // check-in code same as venueID; temporary solution
    queryString = "SELECT venue.latitude, venue.longitude FROM venue WHERE venue.venueID = ?;";
    connection.query(queryString, [checkInCode], function(err, rows, fields) {
      // do not release
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      // if ok, proceed to next nested query
      checkInLatitude = rows[0].latitude;
      checkInLongitude = rows[0].longitude;
      var queryString1;
      // should separate venue and codeUsed and check for validity but OUT OF TIME
      queryString1 = "INSERT INTO `checkIn` (`user`, `venue`, `codeUsed`, `latitude`, `longitude`) VALUES (?, ?, ?, ?, ?);";
      connection.query(queryString1, [req.session.userID, checkInCode, checkInCode, checkInLatitude, checkInLongitude], function(err1, rows1, fields1) {
        // finally release
        connection.release();
        if (err1) {
          console.log(err1);
          // 520 unknown error; failing at insertion or other errors
          res.redirect(520, '/')
          return;
        }
        res.redirect(200, '/')
      });
    });
  })
});
app.post('/Action/CreateRegistrationCode', function(req, res, next) {
  // takes json object with STRING values
  if (req.session.usermode !== 'admin') {
    res.sendStatus(401);
    return;
  }
  // if missing really mandatory fields
  if (!req.query.usermode || (req.query.usermode.toLowerCase() !== 'user' && req.query.usermode.toLowerCase() !== 'manager' && req.query.usermode.toLowerCase() !== 'admin')) {
    res.sendStatus(400);
    return;
  }

  var newCode;
  // check if code is satisfactorily supplied
  if (req.body.code && req.body.code.length >= 8) {
    newCode = req.body.code.toLowerCase();
  } else {
    // MySQL is already configured to generate a random code if not supplied
    newCode = null;
  }

  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var queryString;
    queryString = "INSERT INTO `registrationCode` (`code`, `createdBy`, `usermode`, `validityStart`, `validityEnd`, `remainingUsage`) VALUES (?, ?, ?, ?, ?, ?);";
    // NEED to check for and insert validity timestamps as well
    connection.query(queryString, [newCode, req.session.userID, req.query.usermode.toLowerCase(), (req.body.validityStart && req.body.validityStart.length > 0)? req.body.validityStart : null, (req.body.validityEnd && req.body.validityEnd.length > 0)? req.body.validityEnd : null, (req.body.remainingUsage && !isNaN(req.body.remainingUsage) && parseInt(req.body.remainingUsage) > 0)? req.body.remainingUsage : null], function(err, rows, fields) {
      connection.release();
      if (err) {
        console.log(err);
        // 520 unknown error; failing at insertion or other errors
        res.sendStatus(520);
        return;
      }
      res.sendStatus(200);
    });
  })
});
app.post('/Action/CreateHotspotTimeframe', function(req, res, next) {
  // takes json object with STRING values
  if (req.session.usermode !== 'admin') {
    res.sendStatus(401);
    return;
  }
  // if missing really mandatory fields
  if (!req.body.venue || req.body.venue.length < 1) {
    res.sendStatus(400);
    return;
  }

  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var queryString;
    queryString = "INSERT INTO `hotspotTimeframe` (`venue`, `affectedUsers`, `createdBy`, `startTime`, `endTime`) VALUES (?, ?, ?, ?, ?);";
    // NEED to check for and insert starting and ending timestamps as well
    connection.query(queryString, [req.body.venue.toLowerCase(), (!isNaN(req.body.affectedUsers) && parseInt(req.body.affectedUsers) >= 0)? req.body.affectedUsers : null, req.session.userID, (req.body.startTime && req.body.startTime.length > 0)? req.body.startTime : null, (req.body.endTime && req.body.endTime.length > 0)? req.body.endTime : null], function(err, rows, fields) {
      // not releasing
      if (err) {
        console.log(err);
        // 520 unknown error; failing at insertion or other errors
        res.sendStatus(520);
        return;
      }
      // do nothing for now
    });
    // TEMPORARY solution, need to get timeframe working
    var queryString2 = "UPDATE `venue` SET venue.isHotspot = 'yes' WHERE venue.venueID = ?;";
    connection.query(queryString2, [req.body.venue.toLowerCase()], function(err, rows, fields) {
      if (err) {
        console.log(err);
        // 520 unknown error; failing at insertion or other errors
        res.sendStatus(520);
        return;
      }
      // do nothing for now
    });
    // finally release and respond
    connection.release();
    res.sendStatus(200);
  })
});

// <Minhaj>
// query for listing users in administration page
app.get('/Action/GetUsersDigest', function(req, res) {
  // insufficient permission
  if (req.session.usermode !== 'admin') {
    res.sendStatus(401);
    return;
  }
  //Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     //for error details
      res.sendStatus(500);
      return;
    }
    //query
    var query = "SELECT userID, CONCAT(firstName,' ',lastName) AS fullName, usermode, recentlyBeenToHotspot FROM user;";
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});

// query for showing check-in history of each user
app.get('/Action/GetUserCheckInHistory', function(req, res) {
  if (!req.query.userID) {
    res.sendStatus(400);
    return;
  }
  const targetUser = req.query.userID.toLowerCase();
  // console.log(targetUser)
  if (req.session.usermode !== 'admin' && targetUser !== req.session.userID) {
    res.sendStatus(401);
    return;
  }
  //Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     //for error details
      res.sendStatus(500);
      return;
    }
    //query
    var query = "SELECT venue.venueID, venue.name, checkIn.time, checkIn.id, venue.latitude, venue.longitude FROM venue INNER JOIN checkIn ON venue.venueID = checkIn.venue WHERE checkIn.user = ?;";
    connection.query(query, [targetUser], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});

// query for showing check-in history of venue
app.get('/Action/GetVenueCheckInHistory', function(req, res) {
  if (!req.query.venueID) {
    res.sendStatus(400);
    return;
  }
  const targetVenue = req.query.venueID.toLowerCase();
  //Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     //for error details
      res.sendStatus(500);
      return;
    }
    // wanted to use another query to check permission first
    // DOES NOT WORK because async
    // async!!
    // ...
    // CEEBS learning async/promise syntax again... this time for Express
    // btw return status 401 in perm check query doesn't work either because js and its stoopid ERR_HTTP_HEADERS_SENT

    //query
    var query = "SELECT user.userID, CONCAT(user.firstName,' ',user.lastName) AS fullName, user.recentlyBeenToHotspot, checkIn.time, checkIn.id FROM user INNER JOIN checkIn ON user.userID = checkIn.user WHERE checkIn.venue = ?;";
    connection.query(query, [targetVenue], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});

//query for listing venues in administration page
app.get('/Action/GetVenuesDigest', function(req, res) {
  // insufficient permission
  if (req.session.usermode !== 'admin') {
    res.sendStatus(401);
    return;
  }
  //Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     //for error details
      res.sendStatus(500);
      return;
    }
    //query
    var query = "SELECT venueID, name, associatedManager, isHotspot FROM venue;";
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});
// </Minhaj>

// <Jash>
//query for listing current hotspots
app.get('/Action/GetCurrentHotspots', function(req, res) {
  // everyone can query
  //Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     //for error details
      res.sendStatus(500);
      return;
    }
    //query
    var query = "SELECT venue.venueID, venue.name, venue.latitude, venue.longitude, venue.radius, hotspotTimeframe.affectedUsers, hotspotTimeframe.startTime, hotspotTimeframe.endTime FROM venue INNER JOIN hotspotTimeframe ON hotspotTimeframe.venue=venue.venueID WHERE hotspotTimeframe.endTime >= now() OR hotspotTimeframe.endTime = null;";
    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });
  });
});
// </Jash>

// <Zac>

// </Zac>

// dev purposes only \/
// app.get('/Action/GoogleAuth/GetGoogleUserProfile', (req, res) => res.send(GoogleUserProfile));
// dev purposes only /\
app.get('/Action/GoogleAuth',
    passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/Action/GoogleAuth/Failure',
    function(req, res) {
      res.redirect(401, '/Auth/Login');
    })
app.get('/Action/GoogleAuth/Callback',
    // redirect to error on failure
    passport.authenticate('google', { failureRedirect: '/Action/GoogleAuth/Failure' }),
    // Successful authentication; check db and respond accordingly
    function(req, res) {
      // if already logged in
      if (req.session.loggedIn === true) {
        let resPayload = "You are already logged in as UID#" + req.session.userID + ". Log out first to continue.";
        res.send(resPayload);
        return;
      }
      req.pool.getConnection(function(err, connection) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        if (GoogleUserProfile) {
          var userEmail = GoogleUserProfile.emails[0].value;
          var queryString;
          queryString = "SELECT * FROM user WHERE email = ?;";
          connection.query(queryString, [userEmail], function(err, rows, fields) {
            connection.release();
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }
            if (rows.length > 0 && rows[0].allowGoogleLogin === 'yes') {
              req.session.loggedIn = true;
              req.session.userID = rows[0].userID;
              req.session.usermode = rows[0].usermode;
              // res.sendStatus(200);
              if (req.session.usermode === 'user') {
                res.redirect('/User/Home');
              } else if (req.session.usermode === 'manager') {
                req.session.associatedVenue = rows[0].associatedVenue;
                res.redirect('/Manager/Home');
              } else if (req.session.usermode === 'admin') {
                res.redirect('/Admin/Home');
              }
            } else {
              res.redirect(401, '/Auth/Login');
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
