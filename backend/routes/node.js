var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('../db/pool')
var Node = require("../models/node");

router.post('/node',function(req,res){

var node = req.body.node;
var id_node_master = ''
var startDate = new Date(req.body.startDate)
var endDate = new Date(req.body.endDate)

var sql = "SELECT id_node_master FROM node_master WHERE node_location = " + mysql.escape(node);

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
                    // console.log('in if')
                        console.log(result)
                        if(result.length === 0){
                            // console.log('in if')
                            res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Bad query.");
                            return
                        }
                      id_node_master = result[0].id_node_master
                      console.log(id_node_master)

                Node.findOne({id_node_master: id_node_master}, function(err, result){
        if (err) {throw err
    }else{
        result.data = result.data.filter(element => {
        return(element.time >= startDate && element.time <= endDate)}
        )

        avgtemp = result.data.reduce((acc, ele)=>{return acc + ele.temperature }, 0)
        avgtemp = Math.floor(avgtemp/result.data.length)
        result.data.sort((a, b) => a.temperature - b.temperature)
        // console.log(result.data)
        lowesttemp = Math.floor(result.data[0].temperature)
        console.log(lowesttemp)
        highesttemp = Math.floor(result.data[result.data.length - 1].temperature)

        avghumidity = result.data.reduce((acc, ele)=>{return acc + ele.humidity }, 0)
        avghumidity = Math.floor(avghumidity/result.data.length)
        result.data.sort((a, b) => a.humidity - b.humidity)
        // console.log(result.data)
        lowesthumidity = Math.floor(result.data[0].humidity)
        highesthumidity = Math.floor(result.data[result.data.length - 1].humidity)

        avglight = result.data.reduce((acc, ele)=>{return acc + ele.light }, 0)
        avglight = Math.floor(avglight/result.data.length) 
        result.data.sort((a, b) => a.light - b.light)
        console.log(result.data)
        lowestlight = Math.floor(result.data[0].light)
        highestlight = Math.floor(result.data[result.data.length - 1].light)

        avgpollution = result.data.reduce((acc, ele)=>{return acc + ele.pollution }, 0)
        avgpollution = Math.floor(avgpollution/result.data.length)
        result.data.sort((a, b) => a.pollution - b.pollution)
        // console.log(result.data)
        lowestpollution = result.data[0].pollution
        highestpollution = result.data[result.data.length - 1].pollution       

        var reply = {id_node_master: result.id_node_master, avgtemp, lowesttemp, highesttemp, avghumidity, lowesthumidity, highesthumidity, avglight, lowestlight, highestlight, avgpollution, lowestpollution, highestpollution, data: result.data}
        res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(JSON.stringify(reply));
    }
    })
                      
                }
            });
        }
        con.release()
    });

})

module.exports = router;
