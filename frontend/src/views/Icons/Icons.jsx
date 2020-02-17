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

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "routes/dashboard.jsx";


import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";
var data = [];
class Icons extends Component{
    constructor(props) {
        super(props);
    }

        state = {
            username: '',
            isLoggedIn:'',
            userId: '',
            sensorData: '',
            message : ''
        };

    handleSubmit(sensor_id, sensor_type){
        console.log(sensor_id)
        let sensorDataFoSimulation = {
            sensor_id : sensor_id,
            sensor_type : sensor_type
        }
        API.simulateData(sensorDataFoSimulation).then((res) => {
            //console.log("status " +[res]);
            if (res) {
                console.log(' Success')
                this.setState({
                    isLoggedIn: true,
                    message: "Data Simulated for the selected sensor"
                });
                //console.log("state " +data[0].sensor_make);
                this.props.history.push('/icons');
            } else if (res.status === '401') {
                console.log("No records");
                this.setState({
                    isLoggedIn: true,
                    message: "No Sensor found..!!",
                });
            } else if (res.status === '402') {
                this.setState({
                    isLoggedIn: false,
                    message: "Session Expired..!!",
                });
                this.props.history.push('/login');
            }
        });


    }
        componentWillMount() {
            API.fetchSensorData()
                .then((res) => {
                    //console.log("status " +[res]);
                    if (res) {
                        console.log(' Success')
                        this.setState({
                            isLoggedIn: true,
                            sensorData: res
                        });
                        data = res;
                        //console.log("state " +data[0].sensor_make);
                        this.props.history.push('/icons');
                    } else if (res.status === '401') {
                        console.log("No records");
                        this.setState({
                            isLoggedIn: true,
                            message: "No Senosrs found..!!",
                        });
                    } else if (res.status === '402') {
                        this.setState({
                            isLoggedIn: false,
                            message: "Session Expired..!!",
                        });
                        this.props.history.push('/login');
                    }
                });
        }

        render() {
            const {classes, ...rest} = this.props;
            var self = this;
            //console.log('map', data)

            const withKeys = data && data.map((function(item){
                return(
                    <tr key={item.id_sensor_master_pk} onClick={self.handleClick} className="odd ProjectTable-row project-details">
                        {/*changed coloumn names as per mongo db column names*/}
                        <td className='ProjectTable-cell '>{item.id_sensor_master_pk}</td>
                        <td className='ProjectTable-cell '>{item.node_id_fk}</td>
                        <td className='ProjectTable-cell'>{item.sensor_location}</td>
                        <td className='ProjectTable-cell'>{(new Date(item.sensor_add_date)).toLocaleDateString()}</td>
                        <td className='ProjectTable-cell'>{item.sensor_make}</td>
                        <td className='ProjectTable-cell'>{item.sensor_model}</td>
                        <td className='ProjectTable-cell'>{item.sensor_type}</td>
                        <td className='ProjectTable-cell'>{item.status}</td>
                        <td className='ProjectTable-cell'>
                            <Button bsStyle="success" bsSize="sm"
                                    onClick={() => self.handleSubmit(item.id_sensor_master_pk, item.sensor_type)}> Simulate Data </Button> &nbsp; &nbsp;
                        </td>


                    </tr>
                )
            }))
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
                <GridContainer>
                    <div className="main-content text-left">
                        <div className="dashboard_tab_wrapper text-left">
                            <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Sensor Simulation</NavLink></div>
                            <div className="dashboard_tab"> <NavLink to="/financialDashboardOut">Configure Sensor</NavLink></div>
                        </div>
                    </div>
                    <GridItem xs={22} sm={22} md={22}>
                        <Card plain>
                            <CardHeader plain color="primary">
                                <h4 className={classes.cardTitleWhite}>Sensor Details</h4>
                                <p className={classes.cardCategoryWhite}> </p>
                            </CardHeader>
                            <CardBody>
                                <Hidden only={["sm", "xs"]}>
                                    <div >
                                        {/*<div className="col-md-3">*/}
                                        {this.state.message && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <table className='ProjectTable'>
                                        <thead className='ProjectTable-head'>
                                        <tr>
                                            <th className='ProjectTable-header'>ID</th>
                                            <th className='ProjectTable-header'>NODE   &nbsp;&nbsp;&nbsp;</th>
                                            <th className='ProjectTable-header'>LOCATION</th>
                                            <th className='ProjectTable-header'>ADD DATE&nbsp;&nbsp;&nbsp;</th>
                                            <th className='ProjectTable-header'>MAKE</th>
                                            <th className='ProjectTable-header'>MODEL</th>
                                            <th className='ProjectTable-header'>TYPE</th>
                                            <th className='ProjectTable-header'>STATUS</th>
                                            <th className='ProjectTable-header'>ACTION</th>
                                        </tr>

                                        </thead>
                                        <tbody>
                                        {/*{nameslist}*/}
                                        {withKeys}

                                        </tbody>
                                    </table>
                                </Hidden>

                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                </div>
                </div>
            );

        }
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Icons);
