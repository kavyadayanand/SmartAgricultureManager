var mongoose = require("mongoose");

var sensorData = new mongoose.Schema({
    sensor_id: Number,
    sensor_type: String,
    reading: Number,
    time: { type : Date, default: Date.now }
});

var sensor = new mongoose.Schema({
    sensor_id: Number,
    data: [sensorData]
});

module.exports = mongoose.model("sensorData", sensor);