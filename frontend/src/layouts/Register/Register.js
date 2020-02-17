import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
import {AppBar, Tabs, Tab} from 'material-ui'

// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import Background from 'assets/img/background1.jpg';
import {nodeURL} from '../../config'

const divStyle = {

};

const opacityLayer = {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const headingTitle = {
  color: 'white',
  fontSize: '25px',
  fontWeight:'bold',
  fontFamily:'Roboto',
  display: 'flex',
  padding: 20,
  justifyContent: 'center'
};

const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.35)',
  padding: 25,
  width: 350,
};

const buttonStyle = {
  marginTop:30,
  display: 'flex',
  justifyContent: 'center'
};

class Register extends Component {

  constructor(props){
    super(props);
    this.state={
      user_name:'',
      email:'',
      password:'',
      repassword:'',
      usertype:'',
      contactNumber:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }

  handleDropDownChange = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({usertype: e.target.value});
  };

  handleClick(event,role){
    event.preventDefault();
    if (this.state.password !== this.state.repassword) {
      console.log("Passwords do not match!");
      return;
    } else {
      console.log("Passwords match!");
    }

    // var apiBaseUrl = "http://localhost:3001";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.user_name.length>0  && this.state.email.length>0 && this.state.password.length>0){
      var payload={
      "username": this.state.user_name,
      "email":this.state.email,
      "password":this.state.password,
      "usertype":this.state.usertype,
      "contactNumber":this.state.contactNumber
      }
      axios.post(`${nodeURL}/signup`, payload)
     .then(function (response) {
       console.log(response);
       if(payload.username!=null && payload.email!= null && payload.password!=null && payload.usertype!=null && payload.contactNumber!=null){
          console.log("registration successfull..");
          alert("Registration Successful!!");
          window.location.href = "http://localhost:3000/";
         // var loginscreen=[];
         // loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         // var loginmessage = "Not Registered yet.Go to registration";
         // self.props.parentContext.setState({loginscreen:loginscreen,
         // loginmessage:loginmessage,
         // buttonLabel:"Register",
         // isLogin:true
         //  });
       }
       else{
         console.log("some error ocurred",response.data.code);
         window.location.href = "http://localhost:3000/";
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    return (
      <div style={divStyle}>
        <div style={opacityLayer}>
          <Panel style={panelStyle}>
            <h1 style={headingTitle}> New User Registration  </h1>
            <Form horizontal className="RegisterForm" id="registerForm">

              <FormGroup controlId="userName">
                <FormControl type="text" placeholder="User Name" isRequired="true"
                onChange = {(event) => this.setState({user_name: event.target.value })} />
              </FormGroup>

              <FormGroup controlId="email">
                <FormControl type="email" placeholder="Email address" isRequired="true"
                onChange = {(event) => this.setState({email: event.target.value })} />
              </FormGroup>

              <FormGroup controlId="formPassword">
                <FormControl type="password" placeholder="Password" isRequired="true"
                onChange = {(event) => this.setState({password: event.target.value })} />
              </FormGroup>

              <FormGroup controlId="formRePassword">
                <FormControl type="password" placeholder="Retype Password" isRequired="true"
                onChange = {(event) => this.setState({repassword: event.target.value })} />
              </FormGroup>

              <FormGroup controlId="contactNumber">
                <FormControl type="number" placeholder="Contact Number" maxLength="10" isRequired="true"
                onChange = {(event) => this.setState({contactNumber: event.target.value })} />
              </FormGroup>

              <FormControl componentClass="select" placeholder="select" onChange={this.handleDropDownChange}>
                <option key="Farmer" value="user">Farmer</option>
                <option key="IoT Manager" value="client">IoT Manager</option>
                <option key="IoT support" value="manager">IOT support</option>
              </FormControl>
              <FormGroup style={buttonStyle} controlId="formSubmit">

                <Button bsStyle="primary" type="submit" onClick={this.handleClick}>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </Panel>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 50,
};

export default Register;
