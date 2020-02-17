var mysql = require("mysql");
var pool = mysql.createConnection({
  connectionLimit: 1000,
  //port: "3306",
  host: "127.0.0.1",//"localhost",
  user: "root",
  password: "mysmartagro",
  database: "my_smart_cagro",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

pool.connect(function(err, connection) {
  if (err) console.log("Connection to MySQL DB failed");
  else console.log("Connection to MySQL DB establsihed");
  if(err) {
    console.log(err)
    return
  }
  connection.release();
});

module.exports = pool;
