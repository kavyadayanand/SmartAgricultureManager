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
class addNode extends Component {
    constructor(props) {
        super(props);
    }

    state = {
      nodedata: {
        clusterID :'',
        node_location:'',
        node_status:''
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
        // updatesensordata: {
        //     usensorID: '',
        //     usensor_make: '',
        //     usensor_model: '',
        //     ulocation: '',
        //     ustatus: '',
        //
        //     usensorType: '',
        //     ucreatedBy: ''
        // },
        updatenodedata: {
            unodeID: '',
            unodelocation: '',
            unodestatus: ''
        },
        delnodedata: {
            delnodeID: '',
            delnodelocation: '',
            delnodestatus: ''
        },
        isFound: false,
        delmessage: '',
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
            updatemessage: '',

            clusterID :'',
            node_location:'',
            node_status:'',

            unodeID: '',
            unodelocation: '',
            unodestatus: '',

            delnodeID: '',
            delnodelocation: '',
            delnodestatus: ''


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
                    this.props.history.push('/addNode');
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

    handleSubmit = () => {
      console.log("Sending node details : ", this.state.nodedata)
        API.addNode(this.state.nodedata)
            .then((res) => {
                if (res) {
                    this.setState({
                        message: "Node Added!!",
                    });
                    this.props.history.push("/addNode");
                    console.log("inside add node API.addNode call.");
                } else if (res.status === '401') {
                    console.log("in fail");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });

                }
            });
    };

    handleSearch = (unodeID) => {
        //alert("Searching ....."+usensorID);
        let nodeIDJSON = {nodeID: unodeID}
        API.getNode(nodeIDJSON)
            .then((res) => {
                if (res.length > 0) {
                    console.log(' Success')
                    this.setState({
                        isLoggedIn: true,
                        unodelocation: res[0].node_location,
                        unodestatus: res[0].status,
                        updatemessage: ''
                    });
                    //console.log("state sensor " +this.state.updatesensordata.usensor_make);
                    //this.props.history.push('/addSensor');
                } else if (res.status === '401') {
                    console.log("No node with the given ID found");
                    this.setState({
                        isLoggedIn: true,
                        message: "No node with the given ID found..!!",
                    });
                } else if (res.status === '402') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Session Expired..!!",
                    });
                    this.props.history.push('/login');
                } else {
                    this.setState({
                        updatemessage: "No node with the given ID found!!",
                    });
                }
            });


    }


    handleDelSearch = (delnodeID) => {
        //alert("Searching ....."+usensorID);
        let nodeIDJSON = {nodeID: delnodeID}
        API.getNode(nodeIDJSON)
            .then((res) => {
                //console.log("status " +[res]);
                if (res.length > 0) {
                    console.log(' Success')
                    this.setState({
                        isLoggedIn: true,
                        delnodelocation: res[0].node_location,
                        delnodestatus: res[0].status,
                        delmessage: ''
                    });
                    //console.log("state sensor " +this.state.updatesensordata.usensor_make);
                    //this.props.history.push('/addSensor');
                } else if (res.status === '401') {
                    console.log("No node with the given ID found");
                    this.setState({
                        isLoggedIn: true,
                        message: "No node with the given ID found..!!",
                    });
                } else if (res.status === '402') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Session Expired..!!",
                    });
                    this.props.history.push('/login');
                } else {
                    this.setState({
                        delmessage: "No node with the given ID found!!",
                    });
                }
            });


    }


    handleUpdate = (updateData) => {
        console.log('Updated Data: ', updateData)
        API.updateNode(updateData)
            .then((res) => {
                if (res.length > 0) {
                    console.log(' Success in update ')
                    this.setState({
                        unodelocation: '',
                        unodestatus: '',
                        unodeID: '',
                        updatemessage: 'Selected node updated!!'
                    });
                    //console.log("state sensor " +this.state.updatesensordata.usensor_make);
                    //this.props.history.push('/addSensor');
                } else if (res.status === '401') {
                    console.log("No node with the given ID found");
                    this.setState({
                        isLoggedIn: true,
                        message: "No node with the given ID found..!!",
                    });
                }
            });

    }


    handleDelete = (delnodeID) => {
        let delnodeIDJSON = {delnodeID: delnodeID}
        console.log("Delete id :", delnodeIDJSON.delnodeID)
        API.deleteNode(delnodeIDJSON.delnodeID)
            .then((res) => {
                if (res.length > 0) {
                    console.log(' Success in delete ')
                    this.setState({

                        delnodelocation: '',
                        delnodestatus: '',
                        delnodeID: '',
                        delmessage: 'Below node deleted!!'
                    });
                    //console.log("state sensor " +this.state.updatesensordata.usensor_make);
                    //this.props.history.push('/addSensor');
                } else if (res.status === '401') {
                    console.log("No Node with the given ID found");
                    this.setState({
                        isLoggedIn: true,
                        delmessage: "No node with the given ID found..!!",
                    });
                }
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
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Node Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addNode">Node Sensor</NavLink></div>
                    </div>
                </div>

                {//SECTION ADD NODE starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>ADD NODE</h4>
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
                                        Select Cluster : <select id="ddlNode" className="form-control input-lg" value={this.state.nodedata.clusterID}
                                                onChange={(event) => {
                                                    this.setState({
                                                        nodedata: {
                                                            ...this.state.nodedata,
                                                            clusterID: event.target.value
                                                        }
                                                    });
                                                }} >
                                            <option value="1" >1</option>
                                            <option value="2" >2</option>
                                            <option value="3" >3</option>
                                            <option value="4" >4</option>
                                            <option value="5" >5</option>

                                        </select> &nbsp; &nbsp;<br/>

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

                                        Node Location: <input type="text" className="form-control" placeholder="Enter Node Location" value={this.state.nodedata.node_location}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                nodedata: {
                                                                    ...this.state.nodedata,
                                                                    node_location: event.target.value
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

                                        Select Node Status : <select id="ddlNode" className="form-control input-lg" value={this.state.nodedata.node_status}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             nodedata: {
                                                                                 ...this.state.nodedata,
                                                                                 node_status: event.target.value
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
                                            onClick={() => this.handleSubmit()}> Add Node </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION ADD NODE stops
                }

                {//SECTION UPDATE NODE starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>UPDATE NODE</h4>
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
                                    Search by Node ID: <input type="text" className="form-control" placeholder="Node ID" value={this.state.updatenodedata.unodeID}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            updatenodedata: {
                                                                ...this.state.updatenodedata,
                                                                unodeID: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                                    <Button bsStyle="info" bsSize="sm" block
                                                        onClick={() => this.handleSearch(this.state.updatenodedata.unodeID)}> Search Node </Button>
                                                    <hr/>


                                        Node Location: <input type="text" className="form-control" placeholder="Node Location" defaultValue={this.state.unodelocation}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                updatenodedata: {
                                                                    ...this.state.updatenodedata,
                                                                    unodelocation: event.target.value
                                                                }
                                                            });
                                                        }} readonly="readonly"/><br/>


                                      Current status: <input type="text" className="form-control" placeholder="Node Status" defaultValue={this.state.unodestatus}
                                                      onChange={(event) => {
                                                          this.setState({
                                                              updatenodedata: {
                                                                  ...this.state.updatenodedata,
                                                                  unodestatus: event.target.value
                                                              }
                                                          });
                                                      }} readonly="readonly"/><br/>

                                      Update Node Status : <select id="ddlNode" className="form-control input-lg" defaultValue={this.state.unodestatus}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             updatenodedata: {
                                                                                 ...this.state.updatenodedata,
                                                                                 unodestatus: event.target.value
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
                                                onClick={() => this.handleUpdate(this.state.updatenodedata)}> Update Node </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION UPDATE NODE stops
                }


                {//SECTION DELETE NODE starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>DELETE NODE</h4>
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
                                                {this.state.delmessage}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">


                                    Search by Node ID: <input type="text" className="form-control" placeholder="Enter Node ID" value={this.state.delnodedata.delnodeID}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            delnodedata: {
                                                                ...this.state.delnodedata,
                                                                delnodeID: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                                    <Button bsStyle="info" bsSize="sm" block
                                                        onClick={() => this.handleDelSearch(this.state.delnodedata.delnodeID)}> Search Node</Button>
                                                    <hr/>



                                  Node Location: <input type="text" className="form-control" readonly="readonly" placeholder="Node Location" value={this.state.delnodelocation}
                                                          onChange={(event) => {
                                                              this.setState({
                                                                  delnodedata: {
                                                                      ...this.state.delnodedata,
                                                                      delnodelocation: event.target.value
                                                                  }
                                                              });


                                                          }}/><br/>

                                   Node Status: <input type="text" className="form-control" readonly="readonly" placeholder="Node Status" value={this.state.delnodestatus}
                                                  onChange={(event) => {
                                                      this.setState({
                                                          delnodedata: {
                                                              ...this.state.delnodedata,
                                                              delnodestatus: event.target.value
                                                          }
                                                      });


                                                  }}/><br/>


                                                <Button bsStyle="danger" bsSize="sm" block
                                                    onClick={() => this.handleDelete(this.state.delnodedata)}> Delete Node </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION DELETE NODE stops
                }
            </GridContainer>
            </div>
            </div>
        );

    }
}

addNode.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(addNode);
