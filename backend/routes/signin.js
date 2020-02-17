const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var pool = require('../db/pool')

//Route to handle Post Request Call
router.post('/signin',function(req,res){
    
    console.log("Inside Login Post Request");
    console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;
        var usertype = req.body.usertype;
        var sql = "SELECT *  FROM user WHERE email = " + 
                mysql.escape(email) + "and password = " + mysql.escape(password) + "and usertype = " + mysql.escape(usertype);

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
                    if(result.length === 0){
                        console.log('Invalid credentials..');
                        res.writeHead(400, {
                            "Content-Type": 'text/plain'
                                            })
                        res.end("Invalid credentials");
                    }
                    else{
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = result;
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Successful Login");
                        console.log("Successful Login");
                    }
                }
            });
        }
    });
    
});

module.exports = router