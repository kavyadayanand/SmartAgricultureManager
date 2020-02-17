var express = require('express');
var router = express.Router();
var pool = require('../db/pool')


router.post('/getNode',function(req,res){

    console.log("Inside get node by id Request", req.body.nodeID);

    //var sql = "select id_sensor_master_pk, sensor_type, node_id_fk, sensor_model, sensor_make , status from sensor_master";
    var sql = "select * from node_master where id_node_master = " +parseInt(req.body.nodeID);
    console.log(sql)
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
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
                        res.end("No Nodes");
                    }
                    else{
                        res.writeHead(200,{
                            'Content-Type' : 'text/json'
                        })
                        console.log(JSON.stringify(result))
                        res.end(JSON.stringify(result))
                        //res.status(201).json({ status: '201', result: JSON.stringify(result)});
                        console.log("Successfully fetched/searched node data");
                    }
                }
            });
        }
    });

});

module.exports = router;
