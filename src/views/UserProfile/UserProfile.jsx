import React from "react";
import { Grid, Card, CardHeader, withStyles, Typography } from "material-ui";
import axios from 'axios';
import {PropTypes} from "prop-types";

import {
  Button,
  ItemGrid
} from "components";

import avatar from "assets/img/faces/marc.jpg";
import { boxShadow } from "../../variables/styles";
import { CardContent } from "material-ui";

import "../../variables/css/profileStyle.css";

const useStyles = theme => ({
  cardHeader: {
    display: "inline-block",
    width: "100%",
    padding: "0px"
  },
  cardAvatar: {
    maxWidth: "130px",
    maxHeight: "130px",
    margin: "-50px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    ...boxShadow
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0"
  },
});

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      email: "",
      first_name: "",
      last_name: "",
      aadharNo: "",
      panNo: "",
      mobileNo: ""
    }
    
  }

  componentDidMount() {
    try {
      var userData = localStorage.getItem('user');
      const userID = JSON.parse(userData)['userID'];
      const email = JSON.parse(userData)['email'];
      const first_name = JSON.parse(userData)['first_name'];
      const last_name = JSON.parse(userData)['last_name'];
      const aadharNo = JSON.parse(userData)['aadhar_card_no'];
      const panNo = JSON.parse(userData)['pan_card_no'];
      const mobileNo = JSON.parse(userData)['mobile_no'];

      this.setState({
        userID,
        email,
        first_name,
        last_name,
        aadharNo,
        panNo,
        mobileNo
      })
    } catch (error) {

    }
  }

  handleButtonClick = () => {

    try {
      var userData = localStorage.getItem('user');
      const userToken = JSON.parse(userData)['token'];

      let data = new FormData();
      data.set('Authorization', userToken);

      var proxy = ""
      if(process.env.NODE_ENV === "production")
          proxy = "https://crypto-manager-prod.herokuapp.com"
      
      axios.post(
          proxy + '/user/account/logout',
          data
      )
      .then(res => {
          localStorage.removeItem('user');
          window.open("/login","_self");
      })
      .catch(err => {
        try {
          localStorage.removeItem('user');
        } catch (error) {
          // pass
        }
        window.open("/login","_self");
      })
    } catch (error) {
        window.open("/login","_self");
    }   
  }

  render() {
    const { userID, email, first_name, last_name, aadharNo, panNo, mobileNo } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
              <Card>
                <CardHeader
                classes={{
                  root: classes.cardHeader,
                  avatar: classes.cardAvatar
                }}
                  avatar={<img src={avatar} alt="..." className={classes.img} />}
                />

                <div className="local-bootstrap">

                <div className="nameHeader">
                  <CardContent>
                    <Typography variant="h2" component="h2"> {first_name + " " + last_name} </Typography>
                  </CardContent>
                </div>

                  <div className="profileDetails">
                    <CardContent>
                      <Typography variant="subtitle" component="h3"> Personal </Typography>
                    </CardContent>

                    <CardContent>
                      <Grid container>
                        <ItemGrid xs={12} sm={6} md={6}>
                          <div className="userDetails">
                            <Typography variant="h5" component="h5" style={{
                              color: '#A9A9A9'
                            }}> E-mail </Typography>

                          <Typography variant="h5" component="h5" style={{
                            marginLeft: 100
                          }}> {email} </Typography>
                          </div>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={6} md={6}>
                          <div className="userDetails">
                            <Typography variant="h5" component="h5" style={{
                              color: '#A9A9A9'
                            }}> Aadhar Number </Typography>

                          <Typography variant="h5" component="h5" style={{
                            marginLeft: 100
                          }}> {"XXXX" + aadharNo.substr(aadharNo.length-4,aadharNo.length)} </Typography>
                          </div>
                        </ItemGrid>

                      </Grid>

                      <div className="secondRow">
                        <Grid container>
                          <ItemGrid xs={12} sm={6} md={6}>
                            <div className="userDetails">
                              <Typography variant="h5" component="h5" style={{
                                color: '#A9A9A9'
                              }}> Phone </Typography>

                            <Typography variant="h5" component="h5" style={{
                              marginLeft: 100
                            }}> {mobileNo} </Typography>
                            </div>
                          </ItemGrid>

                          <ItemGrid xs={12} sm={6} md={6}>
                            <div className="userDetails">
                              <Typography variant="h5" component="h5" style={{
                                color: '#A9A9A9'
                              }}> Pan Number </Typography>

                            <Typography variant="h5" component="h5" style={{
                              marginLeft: 130
                            }}> {"XXXX" + panNo.substr(panNo.length-4,panNo.length)} </Typography>
                            </div>
                          </ItemGrid>

                        </Grid>
                      </div>
                    </CardContent>
                  </div>

                  <div className="profileDetails">
                    <CardContent>
                      <Typography variant="subtitle" component="h3"> Account </Typography>
                    </CardContent>

                    <CardContent>
                      <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <div className="userDetails">
                            <Typography variant="h5" component="h5" style={{
                              color: '#A9A9A9'
                            }}> Products </Typography>

                          <Typography variant="h5" component="h5" style={{
                            marginLeft: 100
                          }}> CNC, NRML, MIS, BO, CO </Typography>
                          </div>
                        </ItemGrid>

                      </Grid>

                      <div className="secondRow">
                        <Grid container>
                          <ItemGrid xs={12} sm={12} md={12}>
                            <div className="userDetails">
                              <Typography variant="h5" component="h5" style={{
                                color: '#A9A9A9'
                              }}> Order Types </Typography>

                            <Typography variant="h5" component="h5" style={{
                              marginLeft: 70
                            }}> MARKET, LIMIT, SL, SL-M </Typography>
                            </div>
                          </ItemGrid>

                        </Grid>
                      </div>
                    </CardContent>
                  </div>


                  <div className="profileDetails">
                    <CardContent>
                      <Typography variant="subtitle" component="h3"> Bank Details </Typography>
                    </CardContent>

                    <CardContent>
                      <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <div className="userDetails">
                            <Typography variant="h5" component="h5" style={{
                              color: '#A9A9A9'
                            }}> Bank Accounts </Typography>

                          <Typography variant="h5" component="h5" style={{
                            marginLeft: 60
                          }}> *7000 </Typography>
                          </div>
                        </ItemGrid>

                      </Grid>

                      <div className="secondRow">
                        <Grid container>
                          <ItemGrid xs={12} sm={12} md={12}>
                            <div className="userDetails">
                              <Typography variant="h5" component="h5" style={{
                                color: '#A9A9A9'
                              }}> Bank </Typography>

                            <Typography variant="h5" component="h5" style={{
                              marginLeft: 150
                            }}> ICICI LTD </Typography>
                            </div>
                          </ItemGrid>

                        </Grid>
                      </div>
                    </CardContent>
                  </div>

                </div>

                <div className="signOutButton">
                  <Button color="primary" round onClick={this.handleButtonClick}
                    style={{
                      borderRadius: 5,
                      // backgroundColor: "#FF2400",
                      padding: "10px 25px",
                      fontSize: "18px"
                  }}>
                    Sign Out
                  </Button>
                </div>

              </Card>

          </ItemGrid>
        </Grid>

      </div>
    );
  }
  
}


UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(UserProfile);