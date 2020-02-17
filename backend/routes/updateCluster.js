var express = require('express');
var router = express.Router();
var pool = require('../db/pool')


// console.log("__________________________________________")
// console.log("Before route.post(/updateCluster)")

router.post('/updateCluster',function(req,res){

    console.log("Inside update cluster!!!", req.body.uclusterID);
    console.log("Inside update cluster!!!", req.body.uclusterstatus);
    // let uclusterlocation = req.body.uclusterlocation
    let uclusterstatus = req.body.uclusterstatus
    let uclusterID = parseInt(req.body.uclusterID)

    // console.log("node location: ", uclusterlocation)

    var sql = "UPDATE cluster_master SET status = ?  where id_cluster_master_pk = ?";
    var params = [uclusterstatus, uclusterID ]

    console.log("Query is : ", sql)
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql ,params, function(err,result){
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
                        res.end("No Clusters");
                    }
                    else{
                        if(result.affectedRows >= 1){
                            result += {"status": 200}
                        }
                        res.writeHead(200,{
                            'Content-Type' : 'text/json'
                        })

                        console.log(JSON.stringify(result))
                        res.end(JSON.stringify(result))
                        //res.status(201).json({ status: '201', result: JSON.stringify(result)});
                        console.log("Successfully updated cluster data!!!");
                    }
                }
            });
        }
    });

});

module.exports = router;
