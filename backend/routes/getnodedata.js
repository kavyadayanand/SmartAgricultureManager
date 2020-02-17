const express = require('express')
const router = express.Router()
var Node = require("../models/node");

router.post("/getnodedata", function(req, res) {
    console.log("Inside get data request");
    console.log(req.body);

    Node.findOne({id_node_master: req.body.nodeid }, function(err, data){
        if(err){
        console.log(err);
        throw err
        }
        else{
            console.log(data)
            res.send(data)
        // callback(null, data);
        } 
});
})


module.exports = router