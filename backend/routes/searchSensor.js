var express = require('express')
var router = express.Router()
var mysql = require('mysql');
var pool = require('../db/pool')

router.get('/searchSensor',function(req,res){
    console.log("Inside SEEARCH SENSOR DATAAAAAAAAAAAAAA");
    var reply = {}


    var sql = "SELECT * FROM sensor_master"
    // var sql = "SELECT * FROM sensor_master where id_sensor_master_pk = "+req.body.id
    // var sql2 = "SELECT id_node_master, node_location, last_updated, cluster_node_id_fk, status, createdby, date_format(node_add_date, '%d %M %Y') as node_add_date FROM node_master"

    pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid query");
        } else {
          sensordata = result
          // totalclusters = result.length
          // activeclusters = result.filter((element)=>{
          //     return (element.status === 'Active')
          // })
          // activeclusters = activeclusters.length
        }
        console.log(result);
        res.end(JSON.stringify(result));
      });

      con.release();
    }
  });


    });

module.exports = router
