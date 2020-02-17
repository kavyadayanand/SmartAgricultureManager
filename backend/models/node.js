var mongoose = require("mongoose");

var Nodedata = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  light: Number,
  pollution: Number,
  time: { type : Date, default: Date.now }
});

var Node = new mongoose.Schema({
  id_node_master: Number,
  data: [Nodedata]
});

module.exports = mongoose.model("nodes", Node);