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
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};
var data = [];
class addCluster extends Component {
    constructor(props) {
        super(props);
    }

    state = {
      clusterdata: {
        cluster_location:'',
        cluster_status:''
      },
        sensordata: {
            sensorID: '',
            sensor_make: '',
            sensor_model: '',
            location: '',
            status: '',
            nodeId: '',
            sensorType: '',
            createdBy: ''
        },
        updateclusterdata: {
            uclusterID: '',
            uclusterlocation: '',
            uclusterstatus: ''
        },
        delclusterdata: {
            delclusterID: '',
            delclusterlocation: '',
            delclusterstatus: ''
        },
        isFound: false,
        delmessage: '',
        delmessage2: '',
        updatemessage: ''

    };

    componentWillMount() {
        this.setState({
            sensorID: '',
            sensor_make: '',
            sensor_model: '',
            location: '',
            status: '',
            nodeId: '',
            sensorType: '',
            createdBy: '',

            delmessage: '',
            delmessage2: '',
            updatemessage: '',

            cluster_location:'',
            cluster_status:'',

            uclusterID: '',
            uclusterlocation: '',
            uclusterstatus: '',

            delclusterID: '',
            delclusterlocation: '',
            delclusterstatus: ''


        });

        API.fetchSensorData()
            .then((res) => {
                //console.log("status " +[res]);
                if (res) {
                    console.log(' Success')
                    this.setState({
                        isLoggedIn: true,
                        sensordata: res
                    });
                    data = res;
                    console.log('ID: ', this.state.sensordata.sensorID)
                    console.log('map', data)
                    this.props.history.push('/addCluster');
                } else if (res.status === '401') {
                    console.log("No records");
                    this.setState({
                        isLoggedIn: true,
                        message: "No Nodes found..!!",
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

handleSearch = (clusterID) => {
        // alert("Searching ....."+usensorID);
        console.log("searching ", clusterID);
        let clusterIDJSON = {uclusterID: clusterID}
        // console.log("searching ", clusterIDJSON);
        API.getCluster(clusterIDJSON)
            .then((res) => {
                //console.log("status " +[res]);
                if (res.length > 0) {
                    console.log(' Success')
                    this.setState({
                        isLoggedIn: true,
                        uclusterlocation: res[0].cluster_location,
                        uclusterstatus: res[0].status,
                        updatemessage: ''
                    });
                    console.log("state  " +this.state.uclusterstatus);
                    console.log("state  " +this.state.uclusterlocation);
                    //this.props.history.push('/addSensor');
                } else if (res.status === '401') {
                    console.log("No cluster with the given ID found");
                    this.setState({
                        isLoggedIn: true,
                        message: "No cluster with the given ID found..!!",
                    });
                } else if (res.status === '402') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Session Expired..!!",
                    });
                    this.props.history.push('/login');
                } else {
                    this.setState({
                        updatemessage: "No cluster with the given ID found!!",
                    });
                }
            });


    }

    handleDelSearch = (clusterID) => {
            // alert("Searching ....."+usensorID);
            console.log("searching before deletion : ", clusterID);
            let clusterIDJSON = {delclusterID: clusterID}
            // console.log("searching ", clusterIDJSON);
            API.getDelCluster(clusterIDJSON)
                .then((res) => {
                    //console.log("status " +[res]);
                    if (res.length > 0) {
                        console.log(' Success')
                        this.setState({
                            isLoggedIn: true,
                            delclusterlocation: res[0].cluster_location,
                            delclusterstatus: res[0].status,
                            delmessage: '',

                        });
                        console.log("del state  " +this.state.delclusterstatus);
                        console.log("del state  " +this.state.delclusterlocation);
                        //this.props.history.push('/addSensor');
                    } else if (res.status === '401') {
                        console.log("No cluster with the given ID found");
                        this.setState({
                            isLoggedIn: true,
                            message: "No cluster with the given ID found..!!",
                        });
                    } else if (res.status === '402') {
                        this.setState({
                            isLoggedIn: false,
                            message: "Session Expired..!!",
                        });
                        this.props.history.push('/login');
                    } else {
                        this.setState({
                            delmessage: "No cluster with the given ID found!!",
                        });
                    }
                });


        }

    handleSubmit = () => {
      console.log("Sending cluster details : ", this.state.clusterdata)
        API.addCluster(this.state.clusterdata)
            .then((res) => {
                if (res) {
                    this.setState({
                        message: "Cluster Added!!",
                    });
                    this.props.history.push("/addCluster");
                } else if (res.status === '401') {
                    console.log("in fail");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });

                }
            });
    };





    handleUpdate = (updateData) => {
        console.log('Sending this data :: ', updateData)
        // console.log('location : ', updateData.uclusterlocation)
        API.updateCluster(updateData)
            .then((res) => {
                if (res.length > 0) {
                    console.log(' Success in update cluster! ')
                    this.setState({
                      uclusterlocation: '',
                      uclusterstatus: '',
                      uclusterID: '',
                      updatemessage: 'Selected cluster Updated!!'
                    });
                    //console.log("state sensor " +this.state.updatesensordata.usensor_make);
                    //this.props.history.push('/addSensor');
                } else if (res.status === '401') {
                    console.log("No cluster with the given ID found");
                    this.setState({
                        isLoggedIn: true,
                        message: "No cluster with the given ID found..!!",
                    });
                }
            });

    }

    handleDelete = () => {
      this.setState({
        delmessage : 'Cluster has dependent active nodes.',
        delmessage2: 'Cluster cannot be deleted!'
      });

    }


    // componentDidUpdate(){
    //   console.multerConfig
    // }
    render() {
        const {classes, ...rest} = this.props;
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
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Cluster Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addNode">Cluster Sensor</NavLink></div>
                    </div>
                </div>

                {//SECTION ADD NODE starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>ADD CLUSTER</h4>
                            <h6 className={classes.cardTitleWhite}>Please select options from below</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Hidden only={["sm", "xs"]}>
                                <div style={divStyle1}>
                                    {/*<div>*/}
                                    {/*<div>*/}
                                    <div >
                                        {/*<div className="col-md-3">*/}
                                        {this.state.message && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">


                                  {  /*Enter Node ID Type : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.sensorType}
                                                          onChange={(event) => {
                                                              this.setState({
                                                                  sensordata: {
                                                                      ...this.state.sensordata,
                                                                      sensorType: event.target.value
                                                                  }
                                                              });
                                                          }} >
                                    <option value="select" >Select </option>
                                    <option value="Temperature" >Temperature</option>
                                    <option value="Humidity" >Humidity</option>
                                    <option value="Light" >Light</option>
                                    <option value="Pollution" >Pollution</option>

                                </select> &nbsp; &nbsp;<br/>*/}

                                        Cluster Location: <input type="text" className="form-control" placeholder="Enter Cluster Location" value={this.state.clusterdata.cluster_location}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                clusterdata: {
                                                                    ...this.state.clusterdata,
                                                                    cluster_location: event.target.value
                                                                }
                                                            });
                                                        }}/><br/>

                                  { /* SenNodesor Make: <input type="text" className="form-control" placeholder="Enter Sensor Make" value={this.state.sensordata.sensor_make}

                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_make: event.target.value
                                                   }
                                               });
                                           }}/> <br/>
                                    Sensor Model: <input type="text" className="form-control" placeholder="Enter Sensor Model" value={this.state.sensordata.sensor_model}
                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_model: event.target.value
                                                   }
                                               });


                                           }}/><br/> */}

                                        Select Cluster Status : <select id="ddlNode" className="form-control input-lg" value={this.state.clusterdata.cluster_status}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             clusterdata: {
                                                                                 ...this.state.clusterdata,
                                                                                 cluster_status: event.target.value
                                                                             }
                                                                         });
                                                                     }} >
                                        <option value="select" >select</option>
                                        <option value="Active" >Active</option>
                                        <option value="InActive" >InActive</option>
                                        <option value="Turn On" >Turn On</option>
                                        <option value="Turn Off" >Turn Off</option>
                                        <option value="Maintenance" >Maintenance</option>
                                    </select> &nbsp; &nbsp; <br/>


                                        <Button bsStyle="success" bsSize="sm" block
                                            onClick={() => this.handleSubmit()}> Add Cluster </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION ADD CLUSTER stops
                }

                {//SECTION UPDATE CLUSTER starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>UPDATE CLUSTER</h4>
                            <h6 className={classes.cardTitleWhite}>Please select options from below</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Hidden only={["sm", "xs"]}>
                                <div style={divStyle1}>
                                    {/*<div>*/}
                                    {/*<div>*/}
                                    <div >
                                        {/*<div className="col-md-3">*/}
                                        {this.state.updatemessage && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.updatemessage}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">
                                    Search by Cluster ID: <input type="text" className="form-control" placeholder="Cluster ID" value={this.state.updateclusterdata.uclusterID}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            updateclusterdata: {
                                                                ...this.state.updateclusterdata,
                                                                uclusterID: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                                    <Button bsStyle="info" bsSize="sm" block
                                                        onClick={() => this.handleSearch(this.state.updateclusterdata.uclusterID)}> Search Cluster </Button>
                                                    <hr/>


                                        Cluster Location: <input type="text" className="form-control" placeholder="Cluster Location" defaultValue={this.state.uclusterlocation}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                updateclusterdata: {
                                                                    ...this.state.updateclusterdata,
                                                                    uclusterlocation: event.target.value
                                                                }
                                                            });
                                                        }} readonly="readonly"/><br/>



                                  Current Cluster Status: <input type="text" className="form-control" placeholder="Cluster status" defaultValue={this.state.uclusterstatus}
                                            readonly="readonly"  /><br/>



                                      Update Cluster Status : <select id="ddlNode" className="form-control input-lg" defaultValue={this.state.uclusterstatus}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             updateclusterdata: {
                                                                                 ...this.state.updateclusterdata,
                                                                                 uclusterstatus: event.target.value
                                                                             }
                                                                         });
                                                                     }} >
                                        <option value="select" >select</option>
                                        <option value="Active" >Active</option>
                                        <option value="InActive" >InActive</option>
                                        <option value="Turn On" >Turn On</option>
                                        <option value="Turn Off" >Turn Off</option>
                                        <option value="Maintenance" >Maintenance</option>
                                    </select> &nbsp; &nbsp; <br/>



                                            <Button bsStyle="primary" bsSize="sm" block
                                                onClick={() => this.handleUpdate(this.state.updateclusterdata)}> Update Cluster </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION UPDATE CLUSTER stops
                }


                {//SECTION DELETE CLUSTER starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>DELETE CLUSTER</h4>
                            <h6 className={classes.cardTitleWhite}>Please select options from below</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Hidden only={["sm", "xs"]}>
                                <div style={divStyle1}>
                                    {/*<div>*/}
                                    {/*<div>*/}
                                    <div >
                                        {/*<div className="col-md-3">*/}
                                        {this.state.delmessage && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.delmessage}<br/>
                                                {this.state.delmessage2}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">


                                    Search by Cluster ID: <input type="text" className="form-control" placeholder="Enter Cluster ID" value={this.state.delclusterdata.delclusterID}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            delclusterdata: {
                                                                ...this.state.delclusterdata,
                                                                delclusterID: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                                    <Button bsStyle="info" bsSize="sm" block
                                                        onClick={() => this.handleDelSearch(this.state.delclusterdata.delclusterID)}> Search Cluster</Button>
                                                    <hr/>



                                  Cluster Location: <input type="text" className="form-control" readonly="readonly" placeholder="Cluster Location" value={this.state.delclusterlocation}
                                                          onChange={(event) => {
                                                              this.setState({
                                                                  delclusterdata: {
                                                                      ...this.state.delclusterdata,
                                                                      delclusterlocation: event.target.value
                                                                  }
                                                              });


                                                          }}/><br/>

                                   Cluster Status: <input type="text" className="form-control" readonly="readonly" placeholder="Cluster Status" value={this.state.delclusterstatus}
                                                  onChange={(event) => {
                                                      this.setState({
                                                          delclusterdata: {
                                                              ...this.state.delclusterdata,
                                                              delclusterstatus: event.target.value
                                                          }
                                                      });


                                                  }}/><br/>


                                                <Button bsStyle="danger" bsSize="sm" block
                                                    onClick={() => this.handleDelete()}> Delete Cluster </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION DELETE CLUSTER stops
                }
            </GridContainer>
            </div>
            </div>
        );

    }
}

addCluster.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(addCluster);
