var express = require('express');
var router = express.Router();
var pool = require('../db/pool')


router.post('/updateNode',function(req,res){

    console.log("Inside update node by id Request", req.body.unodeID);
    // let unodelocation = req.body.unodelocation
    let unodestatus = req.body.unodestatus
    let unodeID = parseInt(req.body.unodeID)

    // console.log("node location: ", unodelocation)

    var sql = "UPDATE node_master SET status = ?  where id_node_master = ?";
    var params = [unodestatus, unodeID ]

    console.log(sql)
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
                        res.end("No Nodes");
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
                        console.log("Successfully updated node data");
                    }
                }
            });
        }
    });

});

module.exports = router;
