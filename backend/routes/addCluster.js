
var express = require('express');
var router = express.Router();
var pool = require('../db/pool')

// console.log("__________________________________________")
// console.log("Before route.post(/addCluster)")

router.post('/addCluster',function(req,res){

    // var nodeID = req.body.nodeId;
    // var sensor_make = req.body.sensor_make;
    // var sensor_model =  req.body.sensor_model;
    // var cluster_fk = req.body.clusterID;
    var cluster_location = req.body.cluster_location;
    var cluster_status = req.body.cluster_status;
    var createdBy = "Infrastructure Manager";


    //var reqEmployer = req.session.userId;
    // var sensorType = req.body.sensorType
    // var createdBy = req.body.createdBy
    var reqDate = Date.now();
    // var cluster_fk = 120021;
    // console.log("__________________________________________")
    // console.log("Inside add cluster backend API CALL, before insert.")

    var addCluster = "insert into cluster_master" +
        "(`cluster_location`,`status`,`createdBy`) values " +
        "('"+cluster_location+"','" +cluster_status+"','" +createdBy+"')";


        // var addNode = "insert into node_master" +
        //     "(`node_location`,`node_add_date`, `last_updated`,`cluster_node_id_fk`,`status`,`createdBy`) values " +
        //     "('"+node_location+"',"+reqDate+",'" +reqDate+"','" +cluster_fk+"','" +node_status+"','"+createdBy+"')";


    console.log("Query for add cluster is:" +addCluster);
    console.log("Inside add cluster ");

    //var sql = "select id_sensor_master_pk, sensor_type, node_id_fk, sensor_model, sensor_make , status from sensor_master";

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(addCluster,function(err,result){
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
                        res.end("No Cluster added!");
                    }
                    else{
                        res.writeHead(200,{
                            'Content-Type' : 'text/json'
                        })
                        //console.log(JSON.stringify(result))
                        res.end(JSON.stringify(result))
                        //res.status(201).json({ status: '201', result: JSON.stringify(result)});
                        console.log("Successfully added cluster data!");
                    }
                }
            });
        }
    });

});

module.exports = router;
