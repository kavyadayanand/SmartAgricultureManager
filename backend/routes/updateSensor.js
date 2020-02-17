var express = require('express');
var router = express.Router();
var pool = require('../db/pool')


router.post('/updateSensor',function(req,res){

    console.log("Inside update sensor by id Request", req.body.sensorID);
    let usensor_make = req.body.usensor_make
    let usensor_model = req.body. usensor_model
    let usensor_location = req.body.ulocation
    let usensor_type = req.body.usensorType
    let ustatus = req.body.ustatus
    let usensorID = parseInt(req.body.usensorID)

    console.log(usensor_location)

    var sql = "UPDATE sensor_master SET sensor_location = ? ,sensor_model = ?,sensor_make = ?, sensor_type = ?, status = ?  where id_sensor_master_pk = ?";
    var params = [usensor_location,usensor_model, usensor_make, usensor_type,ustatus, usensorID ]

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
                        res.end("No Sensors");
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
                        console.log("Successful updated sensor data");
                    }
                }
            });
        }
    });

});

module.exports = router;