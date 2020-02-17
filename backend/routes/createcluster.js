const express = require("express");
const router = express.Router();
var mysql = require("mysql");
var pool = require("../db/pool");

router.post("/createcluster", function(req, res) {
  console.log("Inside New cluster creation Request");
  console.log(req.body);
  var cluster_location = req.body.cluster_location;
  var status = req.body.status;
  var createdby = req.body.createdby;
  // var createdby = req.body.createdby;
  var sql =
    "INSERT INTO cluster_master(cluster_location, status, createdby) VALUES(" +
    mysql.escape(cluster_location) +
    ", " +
    mysql.escape(status) +
    ", " +
    mysql.escape(createdby) +
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
          res.end("Could not create new cluster");
        } else {
          //   res.cookie("cookie", "user", {
          //     maxAge: 900000,
          //     httpOnly: false,
          //     path: "/"
          //   });
          //   req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log(`Successfully created new cluster `);
          res.end("Successfully created new cluster");
        }
      });
    }
    con.release();
  });
});

module.exports = router;
