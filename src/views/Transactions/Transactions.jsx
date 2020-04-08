import React from "react";
import { Grid, Card } from "material-ui";
import PropTypes from 'prop-types';
import { RegularCard, Button, Table, CustomInput, ItemGrid } from "components";
import { CardContent, Typography } from "material-ui";
import { withStyles } from "material-ui";
import { Add, SettingsBackupRestore } from "material-ui-icons";
import "../../variables/css/transactionStyle.css";

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
                {/* <RegularCard
                    cardTitle="Current Holdings"
                    content={
                      <Table
                      tableHeaderColor="primary"
                      tableHead={["Tick", "Name", "Price", "MarketCap", "Volume(24H)", "Circulating", "1h", "24h", "Weekly"]}
                      tableData={[
                          ["BTC", "Bitcoin", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                      ]}
                      />
                    }
                /> */}
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
                    <th scope="col">Price</th>
                    <th scope="col">Invested</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Average</th>
                    <th scope="col">% Change (24 hrs)</th>
                    <th scope="col">% Change (Overall)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>BTC</td>
                    <td>Bitcoin</td>
                    <td>$ 10000</td>
                    <td>$ 20000</td>
                    <td>2</td>
                    <td>$ 10000</td>
                    <td>+ 1.5%</td>
                    <td>- 2.5%</td>
                  </tr>
                  <tr>
                  <td>ETH</td>
                    <td>Ethereum</td>
                    <td>$ 5000</td>
                    <td>$ 30000</td>
                    <td>8</td>
                    <td>$ 5800</td>
                    <td>+ 2.5%</td>
                    <td>+ 12.5%</td>
                  </tr>
                  <tr>
                  <td>LTC</td>
                    <td>LiteCoin</td>
                    <td>$ 1000</td>
                    <td>$ 10000</td>
                    <td>10</td>
                    <td>$ 1000</td>
                    <td>- 0.5%</td>
                    <td>- 3.5%</td>
                  </tr>
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
