var express = require('express');
var router = express.Router();
var pool = require('../db/pool')


router.post('/getDelCluster',function(req,res){

    console.log("Inside get cluster by id Request", req.body.delclusterID);

    //var sql = "select id_sensor_master_pk, sensor_type, node_id_fk, sensor_model, sensor_make , status from sensor_master";
    var sql = "select * from cluster_master where id_cluster_master_pk = " +parseInt(req.body.delclusterID);
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
                        res.end("No CLusters");
                    }
                    else{
                        res.writeHead(200,{
                            'Content-Type' : 'text/json'
                        })
                        console.log(JSON.stringify(result))
                        res.end(JSON.stringify(result))
                        //res.status(201).json({ status: '201', result: JSON.stringify(result)});
                        console.log("Successfully fetched/searched cluster data : ", result);
                        console.log("Location : ", result[0].cluster_location);
                        console.log("Location : ", result[0].status);
                    }
                }
            });
        }
    });

});

module.exports = router;
