var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
// var path = require("path");

var morgan = require("morgan");

var { mongoose } = require("./db/mongoose");
// var mongoose = require("mongoose");
mongoose.set("debug", true);

var mongo = require("mongodb");

var app = express();
app.set("view engine", "ejs");

//Import the established routes
const signupRoutes = require('./routes/signup')
const signinRoutes = require('./routes/signin')
const createCluster = require('./routes/createcluster')
const sendData = require('./routes/senddata')
const getNodeData = require('./routes/getnodedata')
const getDashboard = require('./routes/getdashboard')
const terminateNode = require('./routes/terminatenode')
const startNode = require('./routes/startnode')
const simulatedSensorRoutes = require('./routes/sensorsimulation')
const fetchNode = require('./routes/fetchnode')
const fetchCluster = require('./routes/fetchcluster')
const addSensorRoutes = require('./routes/addSensor')
const Node = require('./routes/node')
const searchSensor = require('./routes/searchSensor')

const simulateData = require('./routes/simulateData')
const getSensor = require('./routes/getSensor')
const deleteSensor = require('./routes/deleteSensor')
const updateSensor = require('./routes/updateSensor')
const addNode = require('./routes/addNode')
const addCluster = require('./routes/addCluster')
const getNode = require('./routes/getNode')
const updateNode = require('./routes/updateNode')
const deleteNode = require('./routes/deleteNode')
const getCluster = require('./routes/getCluster')
const updateCluster = require('./routes/updateCluster')
const getDelCluster = require('./routes/getDelCluster')

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "MySession",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer.arguments(multerConfig));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

/****************************Code*********************************************    */

app.post('/signup', signupRoutes)
app.post('/signin', signinRoutes)
app.post('/createcluster', createCluster)
app.post('/senddata', sendData)
app.post('/getnodedata', getNodeData)
app.get('/getdashboard', getDashboard)
app.post('/terminatenode', terminateNode)
app.post('/startnode', startNode)
app.post('/sensorsimulation', simulatedSensorRoutes)
app.post('/fetchnode', fetchNode)
app.post('/fetchcluster', fetchCluster)
app.post('/addSensor', addSensorRoutes)
app.post('/node', Node)
app.get('/searchSensor', searchSensor)
app.post('/simulateData', simulateData)
app.post('/getSensor', getSensor)
app.post('/deleteSensor', deleteSensor)
app.post('/updateSensor', updateSensor)
app.post('/addNode', addNode)
app.post('/addCluster', addCluster)
app.post('/getNode', getNode)
app.post('/updateNode', updateNode)
app.post('/deleteNode', deleteNode)
app.post('/getCluster', getCluster)
app.post('/updateCluster', updateCluster)
app.post('/getDelCluster', getDelCluster)

app.listen(3002);
console.log("Server Listening on port 3002");
