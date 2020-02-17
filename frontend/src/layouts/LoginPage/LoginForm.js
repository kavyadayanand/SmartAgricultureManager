import React, { Component } from "react";
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
//import { withRouter } from 'react-router-dom';
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Register from "layouts/Register/RegisterPage";
import dashboardRoutes from "routes/dashboard.jsx";
import { Panel, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import {nodeURL} from '../../config'
//import Register from './Register';

const divStyle = {};

const alertTextStyle ={
  fontSize: "18px",
  color: "red",
  fontWeight: "bold",
  fontFamily: "Roboto",
  textAlign: 'center' 
};

const headingTitle = {
  fontSize: "25px",
  color: "white",
  fontWeight: "bold",
  fontFamily: "Roboto",
  display: "flex",
  justifyContent: "center"
};

const panelStyle = {
  backgroundColor: "rgba(255,255,255,0.35)",
  border: 10,
  padding: 20,
  // paddingLeft: 20,
  // paddingRight: 20,
  width: 300
};

const buttonStyle = {
  padding: 5,
  marginTop: 20,
  display: "flex",
  justifyContent: "center"
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      usertype: '',
      authFlag: false,
      invalidCred:false,
      redirect: false
    };
    this.routeChange = this.routeChange.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    this.roleChangeHandler = this.roleChangeHandler.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  routeChange(e) {
    e.preventDefault();
    console.log("gdhag");
    let path = `/register`;
    this.props.history.push(path);
  }

  // state = {
  //   redirect: false
  // }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = e => {
    e.preventDefault();
    console.log("FORM Register!");
    if (this.state.redirect) {
      return <Redirect to="/register" />;
    }
  };

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
    // console.log(this.state.email);
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  roleChangeHandler = e => {
    this.setState({
      usertype: e.target.value
    });
  };

  handleFormSubmit(e) {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
      usertype: this.state.usertype
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(`${nodeURL}/signin`, data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        // store the user session data to session storage.
        // this will be used during sidebar generation.
        sessionStorage.setItem('userType', this.state.usertype);
        this.setState({
          authFlag: true
        });
        
      } else {
        //alert('Invalid email or password')
        this.setState({
          invalidCred: true
        });
      }
    })
    .catch(error => { 
      if (error.response && error.response.status === 400) {
        this.setState({
          invalidCred: true
        });
      }
    });
  }
  handleFormRegister(e) {
    e.preventDefault();
    console.log("FORM Register!");
    this.setRedirect();
  }

  render() {
    if (this.state.redirect) return <Redirect to="/register" />;
    if (this.state.authFlag) return <Redirect to="/dashboard" />;

    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
          <h1 style={headingTitle}> User Login </h1>
          <div className={this.state.invalidCred ? "alert alertVisible" : "alert alertHidden"}>
            <p style={alertTextStyle}> Invalid email address or password provided! </p>
          </div>
          <Form horizontal className="LoginForm" id="loginForm">
            <FormGroup controlId="formEmail">
              <FormControl type="email" placeholder="Email Address" onChange={this.emailChangeHandler}/>
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl type="password" placeholder="Password" onChange={this.passwordChangeHandler}/>
            </FormGroup>

            <FormControl componentClass="select" placeholder="select" onChange={this.roleChangeHandler}>
              <option value="select">Role</option>
              <option value="User">Farmer</option>
              <option value="Admin">IoT Support</option>
              <option value="Manager">IoT Manager</option>
            </FormControl>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button
                style={{ marginLeft: 20 }}
                bsStyle="primary"
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Login
              </Button>
              <Button
                style={{ marginLeft: 30 }}
                bsStyle="primary"
                type="submit"
                onClick={this.setRedirect}
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}

export default LoginForm;
