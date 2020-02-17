const express = require('express')
const router = express.Router()
var Sensor = require("../models/sensorSimulation");


router.post("/simulateData", function(req, res) {
    console.log("Inside new simulate data request");
    console.log(req.body);
    let sensor_id = req.body.sensor_id;
    let sensor_type = req.body.sensor_type;

    for(let i = 0; i <=20; i++){

        Sensor.update({sensor_id: req.body.sensor_id}, {$push: {data: {sensor_type: req.body.sensor_type,
                    reading: Math.floor(Math.random() * 100), //units: F
                    }}}, {upsert:true},function(err, data){
            if(err){

                console.log(err);
                throw err}
            else{
                //console.log(JSON.stringify(result))
                let result = {
                    message : 'Simulated',
                    status: 200
                }
                res.end(JSON.stringify(result))
            }
        });
    }
})


module.exports = router