
var express = require('express');
var router = express.Router();
var pool = require('../db/pool')

router.post('/addSensor',function(req,res){

    var nodeID = req.body.nodeId;
    var sensor_make = req.body.sensor_make;
    var sensor_model =  req.body.sensor_model;
    var location = req.body.location;
    var status = req.body.status;

    //var reqEmployer = req.session.userId;
    var sensorType = req.body.sensorType
    var createdBy = req.body.createdBy
    var reqDate = Date.now();


    var addSensor = "insert into sensor_master" +
        "(`sensor_location`,`node_id_fk`, `sensor_model`,`sensor_make`,`status`,`sensor_type`,`createdBy`, `sensor_add_date`) values " +
        "('"+location+"',"+nodeID+",'" +sensor_model+"','" +sensor_make+"','" +status+"','" +sensorType+"', '"+createdBy+"', '"+reqDate+"')";

    console.log("Query is:"+addSensor);
    console.log("Inside add sensor");

    //var sql = "select id_sensor_master_pk, sensor_type, node_id_fk, sensor_model, sensor_make , status from sensor_master";

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(addSensor,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could not process query.");
                }else{
                    if(result.length === 0){
                        console.log('Invalid credentials.');
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("No Sensors");
                    }
                    else{
                        res.writeHead(200,{
                            'Content-Type' : 'text/json'
                        })
                        //console.log(JSON.stringify(result))
                        res.end(JSON.stringify(result))
                        //res.status(201).json({ status: '201', result: JSON.stringify(result)});
                        console.log("Successful added sensor data");
                    }
                }
            });
        }
    });

});

module.exports = router;