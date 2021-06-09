var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/GetUsersDigest', function(req, res) {
  //Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     //for error details
      res.sendStatus(500);
      return;
    }
    //query
    var query = "SELECT userID, CONCAT(firstName,' ',lastName) AS fullName, recentlyBeenToHotspot, email FROM user WHERE usermode = 'user';";
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

router.get('/GetUserCheckInHistory', function(req, res) {
  //Connect to the database
  req.pool.getConnection(function(err,connection) {
    if (err) {
      console.log(err);     //for error details
      res.sendStatus(500);
      return;
    }
    //query
    var query = "SELECT venue.venueID, venue.name, checkIn.time, checkIn.ID FROM venue INNER JOIN checkIn ON venue.venueID = checkIn.venue WHERE checkIn.user = ?;";
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

module.exports = router;
