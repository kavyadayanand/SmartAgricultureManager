const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var pool = require('../db/pool')

router.get('/getdashboard',function(req,res){
    console.log("Inside get total number of clusters Request");
    var reply = {}

    var sql = "SELECT id_cluster_master_pk, cluster_location, last_updated, status, createdby, date_format(cluster_add_date, '%d %M %Y') as cluster_add_date FROM cluster_master"
    var sql2 = "SELECT id_node_master, node_location, last_updated, cluster_node_id_fk, status, createdby, date_format(node_add_date, '%d %M %Y') as node_add_date FROM node_master"
    var sql3 = "SELECT id_sensor_master_pk, sensor_location, last_updated, sensor_type, node_id_fk, status, createdby, date_format(sensor_add_date, '%d %M %Y') as sensor_add_date FROM sensor_master"

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
          clusterdata = result
          totalclusters = result.length
          activeclusters = result.filter((element)=>{
              return (element.status === 'Active')
          })
          activeclusters = activeclusters.length
          maintenanceclusters = result.filter((element)=>{
              return (element.status === 'Maintenance')
          })
          maintenanceclusters = maintenanceclusters.length
        }
      });

      con.query(sql3, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid query");
        } else {
          sensordata = result 
          totalsensors = result.length
          activesensors = result.filter((element)=>{
              return (element.status === 'Active')
          })
          activesensors = activesensors.length
          maintenancesensors = result.filter((element)=>{
              return (element.status === 'Maintenance')
          })
          maintenancesensors = maintenancesensors.length

          lightsensors = result.filter((element)=>{
              return (element.sensor_type === 'Light')
          })
          lightsensors = lightsensors.length

          pollutionsensors = result.filter((element)=>{
              return (element.sensor_type === 'Pollution')
          })
          pollutionsensors = pollutionsensors.length

          temperaturesensors = result.filter((element)=>{
              return (element.sensor_type === 'Temperature')
          })
          temperaturesensors = temperaturesensors.length

          humiditysensors = result.filter((element)=>{
              return (element.sensor_type === 'Humidity')
          })
          humiditysensors = humiditysensors.length
        }
      });

        con.query(sql2, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid query");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          totalnodes = result.length
          activenodes = result.filter((element)=>{
              return (element.status === 'Active')
          })
          activenodes = activenodes.length
          maintenancenodes = result.filter((element)=>{
              return (element.status === 'Maintenance')
          })
          maintenancenodes = maintenancenodes.length
          reply = {clusterdata: clusterdata,
          totalclusters: totalclusters,
          activeclusters: activeclusters,
          maintenanceclusters: maintenanceclusters,
          sensordata: sensordata,
          totalsensors: totalsensors,
          activesensors: activesensors,
          maintenancesensors: maintenancesensors,
          humiditysensors: humiditysensors,
          temperaturesensors: temperaturesensors,
          pollutionsensors: pollutionsensors,
          lightsensors: lightsensors,
          nodedata: result,
          totalnodes: totalnodes,
          activenodes: activenodes,
          maintenancenodes: maintenancenodes
          }
          console.log(reply);
          res.end(JSON.stringify(reply));
        }
      });


      con.release();
    }
  });

 
    });

module.exports = router