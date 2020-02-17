import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

function UserProfile(props) {
  const { classes } = props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>My Smart Agro User Profile</h4>
            </CardHeader>
            <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>

                <h4 className={classes.cardTitle}>Admin User</h4>
                <CustomInput
                  labelText="My Smart Agro's cloud admin user is allowed to add/update/delete sensors/nodes/clusters."
                  id="about-me"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 2
                  }}
                />
              </GridItem>
            </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>

                {
                  // <CustomInput
                  //   labelText="Admin User"
                  //   id="company-disabled"
                  //   formControlProps={{
                  //     fullWidth: true
                  //   }}
                  //   inputProps={{
                  //     disabled: true
                  //   }}
                  // />
                }
                </GridItem>
                {
                // <GridItem xs={12} sm={12} md={3}>
                //   <CustomInput
                //     labelText="Username"
                //     id="username"
                //     formControlProps={{
                //       fullWidth: true
                //     }}
                //   />
                // </GridItem>
                // <GridItem xs={12} sm={12} md={4}>
                //   <CustomInput
                //     labelText="Email address"
                //     id="email-address"
                //     formControlProps={{
                //       fullWidth: true
                //     }}
                //   />
                // </GridItem>
              }
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <h4 className={classes.cardTitle} id="company-disabled">My-First-Name</h4>
                {
                  // <CustomInput
                  //   labelText="My-First-Name"
                  //   id="company-disabled"
                  //   formControlProps={{
                  //     fullWidth: true
                  //   }}
                  //     inputProps={{
                  //       disabled: true
                  //     }}
                  //
                  // />
                }
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <h4 className={classes.cardTitle} id="company-disabled">My-Last-Name</h4>
                  {
                  //   <CustomInput
                  //   labelText="My-Last-Name"
                  //   id="company-disabled"
                  //   formControlProps={{
                  //     fullWidth: true
                  //   }}
                  //     inputProps={{
                  //       disabled: true
                  //     }}
                  //
                  // />
                }
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                {
                  // <h4 className={classes.cardTitle} id="company-disabled">San Jose, CA</h4>
                }

                  <CustomInput
                    labelText="San Jose"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                {
                  // <h4 className={classes.cardTitle} id="company-disabled">USA</h4>
                }

                  <CustomInput
                    labelText="USA"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />

                </GridItem>
                {
                // <GridItem xs={12} sm={12} md={4}>
                //   <CustomInput
                //     labelText="Postal Code"
                //     id="postal-code"
                //     formControlProps={{
                //       fullWidth: true
                //     }}
                //   />
                // </GridItem>
              }
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Active since:  Nov 18th, 2018"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />

                </GridItem>
              </GridContainer>

            </CardBody>
            {
            // <CardFooter>
            //   <Button color="primary">Update Profile</Button>
            // </CardFooter>
          }
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>ADMIN USER</h6>
              <h4 className={classes.cardTitle}>First-Name Last-Name</h4>
              <p className={classes.description}>
                My Smart City's cloud admin user is allowed to add/update/delete sensors/nodes/clusters.
              </p>
              <Button color="primary" round>
                -------
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(UserProfile);
