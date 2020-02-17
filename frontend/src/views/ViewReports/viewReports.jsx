import React, {Component} from "react";
import PropTypes from "prop-types";
import * as API from "../../api/api";
import {Button} from 'react-bootstrap';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import {NavLink, withRouter, Route} from 'react-router-dom';
import '../common.css';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "routes/dashboard.jsx";

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";
import "assets/css/view-reports-react.css";
// react plugin for creating charts
import ChartistGraph from "react-chartist";

var Chartist = require("chartist");

class viewReports extends Component {
    constructor(props) {
        super(props);
    }

    state = {
      mobileOpen : false
    };

    componentDidUpdate(){
      console.log("component - view reports is successfully loaded!");
    }

    render() {
      var chartdata1 = {
        labels: ['0900', '1200', '1500', '1800', '2100', '2400'],
        series: [
          [15, 20, 50, 35, 14, 3]
        ]
      };
      var options1 = {
        high: 50,
        low: 0
      };
      var barchart1 = new Chartist.Line('.ct-chart', {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          series: []
        }, {
          fullWidth: true,
          chartPadding: {
          right: 40
          }
        });
        var temperaturedetails =  
          <Card chart style = {{width: "70%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '275px', top: '150px',  padding: "25px", margin: "25px"}}>
            <CardHeader color="success" style = {{ paddingTop:"50px"}}>
              <ChartistGraph style={{barchart1}}
                className="ct-chart"
                data={chartdata1}
                type="Line"
                options={options1}
                // listener={dailySalesChart.animation}
              />    
            </CardHeader> 
            <CardBody>
              <h4 className="reportCardTitle">Energy usage distribution</h4>
            </CardBody> 
            <CardFooter stats>
              <div className="reportCardStats">
                Just Updated
              </div>
            </CardFooter>
          </Card> 
      const {classes, ...rest} = this.props;
      return (
          <div id="root" className='rowC'>
              <Sidebar
                routes={dashboardRoutes}
                logoText={"My Smart Agro"}
                logo={logo}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                open={this.state.mobileOpen}
                color="blue"
                {...rest}
              />
            <div id="right">
              <h3> View Reports </h3>
              <div>
                {temperaturedetails}
              </div>
            </div>
          </div>
      );
    }
  }

export default withStyles(iconsStyle)(viewReports);
