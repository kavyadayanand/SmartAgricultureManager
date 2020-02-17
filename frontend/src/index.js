import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import App1 from './App1'

import LoginPage from "layouts/LoginPage/LoginPage";
import RegisterPage from "layouts/Register/RegisterPage";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Icons from "views/Icons/Icons.jsx";
import AddSensor from "views/Icons/addSensor.jsx"
import AddNode from "views/Icons/addNode.jsx"
import AddCluster from "views/TableList/addCluster.jsx"
import SensorData from "views/SensorData/sensorData"
import ViewReports from "views/ViewReports/viewReports.jsx"

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact={true} path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/icons" component={Icons} />
      <Route path="/addSensor" component={AddSensor} />
      <Route path="/addNode" component={AddNode} />
      <Route path="/addCluster" component={AddCluster} />
      <Route path="/node" component={SensorData} />
      <Route path="/viewReports" component={ViewReports} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
// registerServiceWorker();
