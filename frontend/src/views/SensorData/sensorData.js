import React, {Component} from "react";
import axios from 'axios'
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import * as API from "../../api/api";
import {Button} from 'react-bootstrap';

// react plugin for creating charts
import ChartistGraph from "react-chartist";


import Update from "@material-ui/icons/Update";

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
import App1 from '../../layouts/GoogleMaps/app.js'
import {nodeURL} from '../../config.js'

// import App1 from '../../layouts/GoogleMaps/app.js'

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx"

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};


  var data = [];
var Chartist = require("chartist");

class SensorData extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        node: '',
      startDate: '',
      endDate: '',
      nodeData: {},
      flag: false 
    }
    this.nodeChangeHandler = this.nodeChangeHandler.bind(this)
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this)
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this)
    }

    startDateChangeHandler(date) {
    var d = new Date(date);
    // var e = d.toISOString();
    this.setState({startDate: d})
    console.log(this.state.startDate)
  }

  endDateChangeHandler(date) {
    var d = new Date(date);
    this.setState({endDate: d})
  }

  nodeChangeHandler(e) {
    this.setState({node: e.target.value})
  }

   submit = e => {
     if(this.state.startDate === '' || this.state.endDate === '' || this.state.nodeDate === ''){
       alert('Please fill all the details')
       return
     }

    e.preventDefault();
    console.log("Request to get node data");
    const data = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      node: this.state.node
    };
    console.log(data)
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log(data);
    //make a post request with the user data
    axios.post(`${nodeURL}/node`, data).then(response => {
      console.log(response);
      if (response.status === 200) {
          this.setState({
            nodeData: response.data,
            flag: true
          });
          console.log(this.state.nodeData)
      } 
      if(response.statusCode === 400){
        alert('Invalid details')
      }
    });
  }  


  

    render() {
        const { classes, ...rest } = this.props;

        // SENSOR DATA only
        var sensorData = ''
    if( typeof(this.state.nodeData) === Object ||  this.state.nodeData.data === null ||  this.state.nodeData.data === 'undefined' || 1 === 1 ){
      console.log('Properties do not exist')
    sensorData = <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    }
    if(this.state.flag === true){
      console.log('sdafasdf')
sensorData = this.state.nodeData.data.map((function(item, i){
      // console.log(typeof(item.time))
      item.time=new Date(item.time)
      item.time = item.time.toString()
      item.temperature = Math.floor(item.temperature)
      item.humidity = Math.floor(item.humidity)
      item.pollution = Math.floor(item.pollution)
      item.light = Math.floor(item.light)
    return(
        <tr   className="odd ProjectTable-row project-details">
            {/*changed coloumn names as per mongo db column names*/}
            <td className='ProjectTable-cell '>{i+1}</td>
            <td className='ProjectTable-cell '>{item.temperature}</td>
            <td className=' '>{item.humidity}</td>
            <td>{item.pollution}</td>
            <td className='ProjectTable-cell'>{item.light}</td>
            <td className='ProjectTable-cell'>{item.time}</td>
          </tr>
        )
}))
    } 
     



        var chartdata1 = {
  labels: ['Lowest', 'Average', 'Highest'],
  series: [
    [this.state.nodeData.lowesttemp, this.state.nodeData.avgtemp, this.state.nodeData.highesttemp]
  ]
};
var options1 = {
  high: 100,
  low: 0
};
var barchart1 = new Chartist.Bar('.ct-chart6', chartdata1, options1);

var chartdata2 = {
  labels: ['Lowest', 'Average', 'Highest'],
  series: [
    [this.state.nodeData.lowesthumidity, this.state.nodeData.avghumidity, this.state.nodeData.highesthumidity]
  ]
};
var options2 = {
  high: 100,
  low: 0
};
var barchart2 = new Chartist.Bar('.ct-chart7', chartdata2, options2);

var chartdata3 = {
  labels: ['Lowest', 'Average', 'Highest'],
  series: [
    [this.state.nodeData.lowestpollution, this.state.nodeData.avgpollution, this.state.nodeData.highestpollution]
  ]
};
var options3 = {
  high: 50,
  low: 0
};
var barchart3 = new Chartist.Bar('.ct-chart8', chartdata3, options3);

var chartdata4 = {
  labels: ['Lowest', 'Average', 'Highest'],
  series: [
    [this.state.nodeData.lowestlight, this.state.nodeData.avglight, this.state.nodeData.highestlight]
  ]
};
var options4 = {
  high: 1000,
  low: 250
};
var barchart4 = new Chartist.Bar('.ct-chart9', chartdata4, options4);

        var piechart1 = new Chartist.Pie('.ct-chart1', {labels: [`Avgtemp=${this.state.nodeData.avgtemp}`, `Highest = ${this.state.nodeData.highesttemp}`, `Lowest = ${this.state.nodeData.lowesttemp}`],
  series: [this.state.nodeData.avgtemp, this.state.nodeData.highesttemp, this.state.nodeData.lowesttemp]
}, {
  labelOffset: 35,
  labelDirection: 'explode'
});

        var temperaturedetails =  
            <Card chart style = {{width: "30%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '275px', top: '650px', marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}}>
              <CardHeader color="success">
                <ChartistGraph style={{barchart1}}
                  className="ct-chart6"
                  data={chartdata1}
                  type="Bar"
                  options={options1}
                  // listener={dailySalesChart.animation}
                />    
              </CardHeader> 
              <CardBody>
                <h4 className={classes.cardTitle}>Temperature Statistics units(Fahrenheit)</h4>
              </CardBody> 
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card> 

            var humiditydetails =  
            <Card chart style = {{width: "30%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '850px', top: '650px', marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}}>
              <CardHeader color="success">
                <ChartistGraph style={{barchart2}}
                  className="ct-chart7"
                  data={chartdata2}
                  type="Bar"
                  options={options2}
                  // listener={dailySalesChart.animation}
                />    
              </CardHeader> 
              <CardBody>
                <h4 className={classes.cardTitle}>Humidity Statistics in Percentage(Relative)</h4>
              </CardBody> 
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card> 

            var pollutiondetails =  
            <Card chart style = {{width: "30%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '275px', top: '1025px', marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}}>
              <CardHeader color="success">
                <ChartistGraph style={{barchart3}}
                  className="ct-chart8"
                  data={chartdata3}
                  type="Bar"
                  options={options3}
                  // listener={dailySalesChart.animation}
                />    
              </CardHeader> 
              <CardBody>
                <h4 className={classes.cardTitle}>Pollution Statistics units(ppm)</h4>
              </CardBody> 
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card> 

            var lightdetails =  
            <Card chart style = {{width: "30%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '850px', top: '1025px', marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}}>
              <CardHeader color="success">
                <ChartistGraph style={{barchart4}}
                  className="ct-chart9"
                  data={chartdata4}
                  type="Bar"
                  options={options4}
                  // listener={dailySalesChart.animation}
                />    
              </CardHeader> 
              <CardBody>
                <h4 className={classes.cardTitle}>Light Statistics units(lux)</h4>
              </CardBody> 
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card> 
        
        return (
          <div>
          <div>
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
            </div>

            <div>
            <GridContainer xs={225} sm={225} md={225}>
                <div className="main-content text-left">
                    <div className="dashboard_tab_wrapper text-left">
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Node Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addSensor">Node Maasdas</NavLink></div>
                    </div>
                </div>
                <GridItem xs={225} sm={225} md={225} >
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite} text-align="center" >Retrieve Sensor Information</h4>
                              <h6 className={classes.cardTitleWhite}>Click on any sensor on map to display its location</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        </Card>
                        </GridItem>
                        </GridContainer>
                        </div>

                       <div>
                        <GridContainer xs={225} sm={225} md={225}>                
                        <GridItem style = {{top: '5px'}}>
                        <div>
                        <h3>Active nodes</h3>
                        <App1 style = {{top: '5px'}}/>  
                        </div>
                        </GridItem>
                        </GridContainer></div> 

                        <div>
                        <GridContainer>
                        <div className="main-content text-left">
                    <div className="dashboard_tab_wrapper text-left">
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Node Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addSensor">Node Maasdas</NavLink></div>
                    </div>
                </div>
                        </GridContainer>

                        <GridContainer>
                        <div className="main-content text-left">
                    <div className="dashboard_tab_wrapper text-left">
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Node Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addSensor">Node Maasdas</NavLink></div>
                    </div>
                </div>
                        
                        {temperaturedetails}
                        {humiditydetails}
                        {pollutiondetails}
                        {lightdetails}
                        </GridContainer>
                        </div>

                        

             <div style = {{width: "55%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '700px', top: '0px', marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}} >

                <form action="" role="form" class="form-inline">
                
  <div class="form-group">
    <label for="rg-from"><strong>Select Node:</strong></label>
   <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder={this.state.selectedNode} onChange={this.nodeChangeHandler} />
    <br/>
  </div>

  <div class="form-group">
    <label for="rg-from"><strong>Date Range:</strong></label>
    
  </div>
  <br/> 

  <div>
    <DatePicker
              selected={Date.now()}
              onChange={this.startDateChangeHandler}
            /></div><br/>
            <div><DatePicker
              selected={Date.now()}
              onChange={this.endDateChangeHandler} style={{position: "absolute", left: '750px'}}
            /><br/></div>
            <button type="submit" class="btn btn-primary" onClick = {this.submit}>Submit</button>
 
  </form>
  </div>
             

             <Card style = {{width: "55%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '225px', top: '1400px', marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sensor Statistics</h4>
                <p className={classes.cardCategoryWhite}>
                  Below are the live sensor statistics from cloud database
                </p>
              </CardHeader>
             <table className='ProjectTable' tableHeaderColor="primary">
                <thead className='ProjectTable-head'>
                <tr>
                    <th className='ProjectTable-header'>S.No.</th>
                    <th className='ProjectTable-header'>Temperature(F)</th>
                    <th className='ProjectTable-header'>Humidity(%)</th>
                    <th className='ProjectTable-header'>Pollution(ppm)</th>
                    <th className='ProjectTable-header'>Luminosity(lux)</th>
                    <th className='ProjectTable-header'>Time</th>
                </tr>
                </thead>
                <tbody>
                {/*{nameslist} */} 
               {sensorData}  
                </tbody>
            </table>  
              </Card>
             
             
           {/*}         <div class="form-group" style={{position: 'absolute', left: '800px', top: '0px'}}>
   <br/>
   <label for="rg-from"><strong>Select Node:</strong></label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder={this.state.selectedNode} onChange={this.nodeChangeHandler} />
    <br/>
    <label for="rg-from"><strong>Date Range:</strong></label>
    <div>
    <DatePicker
              selected={Date.now()}
              onChange={this.startDateChangeHandler}
            /></div><br/>
            <div><DatePicker
              selected={Date.now()}
              onChange={this.endDateChangeHandler}
            /></div><br/>
            <button type="submit" class="btn btn-primary" onClick = {this.submit}>Submit</button>
  </div>    */}

            </div>
        )}
}

export default withStyles(iconsStyle)(SensorData);