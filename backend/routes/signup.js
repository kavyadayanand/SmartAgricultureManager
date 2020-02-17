const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var pool = require('../db/pool')
// var crypt = require("../bcrypt/crypto");

router.post("/signup", function(req, res) {
  console.log("Inside New user creation Request..");
  console.log(req.body);
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var usertype = req.body.usertype;
  var contactNumber = req.body.contactNumber;
  var date = new Date();
  var timestamp = date.getTime();

  var sql =
    "INSERT INTO user(userId_pk, username, email, password, createTime, contactNo, usertype) VALUES(" +
    0 +
    "," +
    mysql.escape(username) +
    ", " +
    mysql.escape(email) +
    ", " +
    mysql.escape(password) +
    ", " +
    mysql.escape(timestamp) +
    ", " +
    mysql.escape(contactNumber) +
    ", " +
    mysql.escape(usertype) +
    ");";

  pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
            console.log(err);
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Could not create new user");
        } else {
          res.cookie("cookie", "user", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log(`Successfully created new user with username: ${username}`);
          res.end("Successfully created new user");
        }
      });
    }
    con.release();
  });
});



module.exports = router