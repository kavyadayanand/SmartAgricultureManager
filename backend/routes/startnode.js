const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var pool = require('../db/pool')

//Route to handle Post Request Call
router.post('/startnode',function(req,res){
    var nodeid = req.body.nodeid
    
    var sql = "UPDATE node_master SET status = 'Active' where id_node_master = " + mysql.escape(nodeid);  

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
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Node started");
                        console.log("Node started");
                    
                }
            });
        }
    });

    });

module.exports = router