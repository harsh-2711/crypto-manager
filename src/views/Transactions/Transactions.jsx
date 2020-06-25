import React from "react";
import { Grid, Card } from "material-ui";
import PropTypes from 'prop-types';
import { RegularCard, Button, Table, CustomInput, ItemGrid } from "components";
import { CardContent, Typography } from "material-ui";
import { withStyles } from "material-ui";
import { Add, SettingsBackupRestore } from "material-ui-icons";
import "../../variables/css/transactionStyle.css";
import axios from 'axios';

const useStyles = theme => ({
  marginColor: {
    color: '#0080FF',
    fontWeight: 'bold'
  },
  marginTitle: {
    float: 'center',
  },
  addFunds: {
    background: '#00FF00',
  },
  withdraw: {
    background: 'FF0000',
  }
});

class Transaction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rows: []
    }
  }

  resolveRequests = (data) => {
    var proxy = ""
    if(process.env.NODE_ENV === "production")
      proxy = "https://crypto-manager-prod.herokuapp.com"

    let dailyDataRequest = new FormData();
          dailyDataRequest.set('tick', data['tick']);
          dailyDataRequest.set('limit', 1);
          dailyDataRequest.set('currency', 'USD');

          return new Promise((resolve, reject) => {
            axios.post(
              proxy + '/crypto/data/daily',
              dailyDataRequest
            )
            .then(resp => {
              let todayClose = resp.data.Data[1]['close'];
              let todayOpen = resp.data.Data[1]['open'];
              let currentValue = data['quantity'] * todayClose;
              let todayChange = ((todayClose - todayOpen) / todayOpen) * 100;
              let overallChange = ((todayClose - data['price']) / data['price']) * 100;

              this.setState((prevState, props) => {
                const row = {
                  tick: data['tick'],
                  name: data['name'],
                  price: data['price'],
                  investmentPrice: data['investmentPrice'],
                  quantity: data['quantity'],
                  currentValue: currentValue.toFixed(2),
                  todayChange: todayChange.toFixed(2),
                  overallChange: overallChange.toFixed(2) };

                return { rows: [...prevState.rows, row] };
              });

              resolve(resp);
            })
            .catch(error => console.log(error))
          })
   }

  componentDidMount() {
    var proxy = ""
      if(process.env.NODE_ENV === "production")
        proxy = "https://crypto-manager-prod.herokuapp.com"

    var userData = localStorage.getItem('user');
    const email = JSON.parse(userData)['email'];
    const aadharNo = JSON.parse(userData)['aadhar_card_no'];
    const panNo = JSON.parse(userData)['pan_card_no'];

    let data = new FormData();
    data.set('email', email);
    data.set('aadhar_card_no', aadharNo);
    data.set('pan_card_no', panNo);

    axios.post(
      proxy + '/user/portfolio/get',
      data
    )
    .then(res => {
      try {
        var promises = [];
        res.data.map((data, i) => {
          promises.push(this.resolveRequests(data));
        })

        Promise.all(promises).then(() => {
          // console.log("Finished");
        })
      } catch (err) {
        // pass
      }
    })
  }

  render() {
  const { classes } = this.props;

    return (
      <div>
        <div className="local-bootstrap">
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>

              <Card className="fundsMain">
                <Grid container>
                  <ItemGrid xs={12} sm={4} >
                    <CardContent>
                      <Typography component="h6" variant="subtitle1" className={classes.marginTitle} align="center"> Margin Available </Typography>
                      <Typography component="h2" variant="h1" className={classes.marginColor} align="center">$ 5000.50 </Typography>
                    </CardContent>
                  </ItemGrid>

                  <ItemGrid xs={12} sm={4} >
                    <CardContent>
                      <Typography component="h6" variant="subtitle1" className={classes.marginTitle} align="center"> Margin Used </Typography>
                      <Typography component="h2" variant="h1" className={classes.marginColor} align="center">$ 0.0 </Typography>
                    </CardContent>
                  </ItemGrid>

                  <ItemGrid xs={12} sm={4} >
                    <CardContent>
                      <Typography component="h6" variant="subtitle1" className={classes.marginTitle} align="center"> Opening Balance </Typography>
                      <Typography component="h2" variant="h1" className={classes.marginColor} align="center">$ 5000.50 </Typography>
                    </CardContent>
                  </ItemGrid>
                </Grid>

                <CardContent>
                  <div className="addWithdrawButtons">
                    <div className="addFunds">
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: 5,
                          backgroundColor: "#0080FF",
                          padding: "15px 30px",
                          fontSize: "18px"
                      }}
                        startIcon={<Add />}
                        color="primary"
                      >
                        Add Funds
                      </Button>
                    </div>

                    <div className="withdrawFunds">
                      <Button
                        variant="contained"
                        style={{
                          borderRadius: 5,
                          backgroundColor: "#FF2400",
                          padding: "15px 30px",
                          fontSize: "18px"
                      }}
                        startIcon={<SettingsBackupRestore />}
                        color="secondary"
                      >
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </ItemGrid>

            <ItemGrid xs={12} sm={12} md={12}>
      <div className="watchList">
        <Card className="watchListChart">
          <CardContent>
            <Typography component="h3" variant="h1">Current Holdings</Typography>
          </CardContent>

          <CardContent>
            <div className="local-bootstrap">

            <div className="container">
            <div className="searchFilters">
                <div className="searchWatchList">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">Search</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Filter Holdings" aria-label="Search" aria-describedby="basic-addon1"/>
                  </div>
                </div>

              </div>

              <table className="table">
                <thead className='thead-dark'>
                  <tr>
                    <th scope="col">Tick</th>
                    <th scope="col">Name</th>
                    <th scope="col">Buy Price</th>
                    <th scope="col">Invested</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Current Value</th>
                    <th scope="col">% Change (24 hrs)</th>
                    <th scope="col">% Change (Overall)</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.rows.map(row => (
                    <tr>
                      <td className="holdingsRow">{row.tick}</td>
                      <td className="holdingsRow">{row.name}</td>
                      <td className="holdingsRow">{row.price}</td>
                      <td className="holdingsRow">{row.investmentPrice}</td>
                      <td className="holdingsRow">{row.quantity}</td>
                      <td className={row.overallChange > 0 ? 'bullishTrend' : (row.overallChange < 0 ? 'bearishTrend' : 'holdingsRow')}>{row.currentValue}</td>
                      <td className={row.todayChange > 0 ? 'bullishTrend' : (row.todayChange < 0 ? 'bearishTrend' : 'holdingsRow')}>{row.todayChange + " %"}</td>
                      <td className={row.overallChange > 0 ? 'bullishTrend' : (row.overallChange < 0 ? 'bearishTrend' : 'holdingsRow')}>{row.overallChange + " %"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
            </ItemGrid>
        </Grid>
        </div>
      </div>
    );
  }
}

Transaction.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(Transaction);
