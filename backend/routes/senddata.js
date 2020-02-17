const express = require("express");
const router = express.Router();
var Node = require("../models/node");

router.post("/senddata", function(req, res) {
  console.log("Inside new send data request");
  console.log(req.body);

  Node.update(
    { id_node_master: Math.floor(Math.random() * 21) },
    {
      $push: {
        data: {
          temperature: req.body.temperature,
          humidity: req.body.humidity,
          light: req.body.light
        }
      }
    },
    { upsert: true },
    function(err, data) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log(data);
        // callback(null, data);
      }
    }
  );
});

module.exports = router;
