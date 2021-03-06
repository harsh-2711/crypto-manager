import React from "react";
import PropTypes from 'prop-types';
import { Typography, InputLabel, MenuItem, Select, withStyles, FormControl, Card, CardContent, Button } from "material-ui";
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import OrderPopup from "../../components/Popup/OrderPopup"
import "../../variables/css/watchList.css"
import "../../variables/css/bootstrap.css"

import Chart from './Chart';
import { getData } from "./util"

import { TypeChooser } from "react-stockcharts/lib/helper";

const useStyles = theme => ({
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 10,
  },
  table: {
    minWidth: 700,
  },
});

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      graphTick: "BTC",
      graphName: "Bitcoin",
      percentChange: 0,
      chartType: 'candle',
      durationType: 'daily',
      value: '',
      suggestions: [],
      tickArr: [],
      tickList: [],
      cryptoList: [],
      volumeList: [],
      avgVolList: [],
      changeList: [],
      priceList: [],
      trendList: [],
      rows: [],
      loading: false,
      showModal: false,
      selectedStateModal: ""
    }

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.populateChart = this.populateChart.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.modalCallback = this.modalCallback.bind(this);
  }

escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

getSuggestions = (value) => {
  const escapedValue = this.escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return (this.state.tickArr).filter(language => regex.test(language.name));
}

renderSuggestion = (suggestion) => {
  return (
    <span>{suggestion.name}</span>
  );
}

  handleAddRow = (suggestion) => {
    suggestion = suggestion.name;
    var counter = 0
    for(var i in this.state.tickList) {
      if((this.state.tickList[i]).toLowerCase() === (suggestion.toString()).toLowerCase())
        break;
      counter++;
    }

    try {
      var userData = localStorage.getItem('user');
      const email = JSON.parse(userData)['email'];
      const aadharNo = JSON.parse(userData)['aadhar_card_no'];
      const panNo = JSON.parse(userData)['pan_card_no'];
      let data = new FormData();
      data.set('email', email);
      data.set('aadhar_card_no', aadharNo);
      data.set('pan_card_no', panNo);
      data.set('tick', suggestion);

      var proxy = ""
      if(process.env.NODE_ENV === "production")
          proxy = "https://crypto-manager-prod.herokuapp.com"

      axios.post(
        proxy + '/user/watchlist/add',
        data
      )
    } catch (error) {
      // pass
    }

    this.setState((prevState, props) => {
      const row = {
        tick: prevState.tickList[counter],
        name: prevState.cryptoList[counter],
        volume: prevState.volumeList[counter],
        avgVol: prevState.avgVolList[counter],
        change: prevState.changeList[counter],
        price: prevState.priceList[counter],
        trend: prevState.trendList[counter] };
      return { rows: [...prevState.rows, row] };
    });
  };

  addInitialRows = (suggestion) => {
    suggestion = suggestion.name;
    var counter = 0
    for(var i in this.state.tickList) {
      if((this.state.tickList[i]).toLowerCase() === (suggestion.toString()).toLowerCase())
        break;
      counter++;
    }

    if(counter < (this.state.tickList).length) {
      this.setState((prevState, props) => {
        const row = {
          tick: prevState.tickList[counter],
          name: prevState.cryptoList[counter],
          volume: prevState.volumeList[counter],
          avgVol: prevState.avgVolList[counter],
          change: prevState.changeList[counter],
          price: prevState.priceList[counter],
          trend: prevState.trendList[counter] };
        return { rows: [...prevState.rows, row] };
      });
    }
  };

  getSuggestionValue = (suggestion) => {
    this.handleAddRow(suggestion);
    return suggestion.name;
  }

  handleRemoveRow = () => {
    this.setState((prevState, props) => {
      return { rows: prevState.rows.slice(1) };
    });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleTypeChange = (event) => {
    this.setState({chartType: event.target.value})
  };

  handleDurationChange = (event) => {
    this.setState({durationType: event.target.value})
    // this.populateChart();
  }

  handleRowClick = (tick, name, change) => {
    this.setState({ graphTick: tick, graphName: name, percentChange: change, loading: true});
    this.populateChart();
  }

  handleOrder = (orderType) => {
    this.setState({ showModal: true, selectedStateModal: orderType });
  }

  modalCallback = () => {
    this.setState({ showModal: false});
  }

  populateChart() {
    var tick = this.state.graphTick;
    var duration = this.state.durationType;
    console.log(duration);

    var proxy = ""
      if(process.env.NODE_ENV === "production")
        proxy = "https://crypto-manager-prod.herokuapp.com"

    var data = new FormData();
    data.set("tick", tick);
    data.set("currency", "USD");

    if(duration === "daily")
      data.set("limit", 1500);
    else if(duration === "hourly")
      data.set("limit", 3000);
    else
      data.set("limit", 5000);

    axios.post(
      proxy + '/crypto/data/' + duration,
      data
    )
    .then(res => {
      var dailyData = new Array();
      var jsonData = res.data.Data;

      for(var index in jsonData) {
        var ohlc = {
          "date": new Date(jsonData[index]["time"] * 1000),
          "open": jsonData[index]["open"],
          "high": jsonData[index]["high"],
          "low": jsonData[index]["low"],
          "close": jsonData[index]["close"],
          "volume": Math.round(jsonData[index]["volumeto"] - jsonData[index]["volumefrom"]),
          "absoluteChange": "",
          "dividend": "",
          "percentChange": "",
          "split": ""
        }
        dailyData.push(ohlc);
      }

      this.setState({ loading: false });
      this.setState({ data: dailyData });
    })
    .catch(err => {
      console.log(err);

      getData().then(data => {
        this.setState({ loading: false });
        this.setState({ data })
      })
    })
  }

  componentDidMount() {

    this.populateChart();

    var proxy = ""
    if(process.env.NODE_ENV === "production")
        proxy = "https://crypto-manager-prod.herokuapp.com"

    axios.get(
      proxy + '/coins/data/aws'
    )
    .then(response => {
      let tickArr = []
      var tickList = [];
      var cryptoList = [];
      var volumeList = [];
      var avgVolList = [];
      var changeList = [];
      var priceList = [];
      var trendList = [];
      for(let i in response['data']) {
          let tickName = response['data'][i]['tick'];
          let cryptoName = response['data'][i]['name'];
          let volume = response['data'][i]['volume'];
          let avgVol = response['data'][i]['avgVol'];
          let change = response['data'][i]['change'];
          let price = response['data'][i]['price'];
          let trend = response['data'][i]['trend'];
          tickArr.push({name: tickName});
          tickList.push(tickName);
          cryptoList.push(cryptoName);
          volumeList.push(volume);
          avgVolList.push(avgVol);
          changeList.push(change);
          priceList.push(price);
          trendList.push(trend);
      }
      this.setState({
        tickArr,
        tickList,
        cryptoList,
        volumeList,
        avgVolList,
        changeList,
        priceList,
        trendList
      })

        // Populate Watchlist once state variables are ready
        try {
          var userData = localStorage.getItem('user');
          const email = JSON.parse(userData)['email'];
          const aadharNo = JSON.parse(userData)['aadhar_card_no'];
          const panNo = JSON.parse(userData)['pan_card_no'];

          let data = new FormData();
          data.set('email', email);
          data.set('aadhar_card_no', aadharNo);
          data.set('pan_card_no', panNo);

          var proxy = ""
          if(process.env.NODE_ENV === "production")
              proxy = "https://crypto-manager-prod.herokuapp.com"

          axios.post(
            proxy + '/user/watchlist/get',
            data
          )
          .then(response => {
            for(var i in response['data']) {
              this.addInitialRows({name: response['data'][i]});
            }
          })
        } catch (error) {
          // pass
        }
    })
    .catch(err => {
        // pass -> Not data found
    })
	}

  render() {
    const { data, chartType, durationType, graphName, graphTick, loading, percentChange, selectedStateModal, showModal, suggestions, value } = this.state;
    const { classes } = this.props;
    const inputProps = {
      placeholder: "Add to watchlist",
      value,
      onChange: this.onChange
    };

    return (
      <div>
      {
        data ?
        <Card className="watchListChart">
          <CardContent>

            <div className="watchListGraphTitle">
                <div className="tickName">
                  <Typography variant="h1" component="h3">{graphTick}</Typography>
                </div>

                <div className="chartModifications">

                  <div className="durationSelector">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Chart</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={durationType}
                          onChange={this.handleDurationChange} >
                          <MenuItem value={'daily'}> Daily </MenuItem>
                          <MenuItem value={'hourly'}> Hourly </MenuItem>
                          <MenuItem value={'minute'}> Minute </MenuItem>
                        </Select>
                    </FormControl>
                  </div>

                  <div className="chartTypeSelector">
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-filled-label">Chart</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={chartType}
                        onChange={this.handleTypeChange} >
                        <MenuItem value={'candle'}> Candle Chart </MenuItem>
                        <MenuItem value={'area'}>Area Chart</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                </div>

            </div>

          </CardContent>
          <CardContent>
            <TypeChooser>
            {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
          </CardContent>

          {
            loading ?
            <div className="loadingIndicator">
              <Typography variant="h4" component="h4">Loading...</Typography>
            </div>
            :
            null
          }

          <CardContent>
            <div className="buySellButtons">
            <div className="buyButton">
              <Button
                onClick={() => this.handleOrder("buy")}
                variant="contained"
                style={{
                  borderRadius: 5,
                  backgroundColor: "#0080FF",
                  padding: "15px 30px",
                  fontSize: "18px",
                  color: '#ffffff'
              }}
              >
                Buy
              </Button>
            </div>

            <div className="sellButton">
              <Button
                onClick={() => this.handleOrder("sell")}
                variant="contained"
                style={{
                  borderRadius: 5,
                  backgroundColor: "#FF2400",
                  padding: "15px 30px",
                  fontSize: "18px",
                  color: '#ffffff'
              }}
              >
                Sell
              </Button>
            </div>

            </div>
          </CardContent>
        </Card>
        :
        null
      }

      <div className="watchList">
        <Card className="watchListChart">
          <CardContent>
            <Typography component="h3" variant="h1">Watchlist</Typography>
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
                    <input type="text" className="form-control" placeholder="Filter Watchlist" aria-label="Search" aria-describedby="basic-addon1"/>
                  </div>
                </div>

                <div className="addWatchList">
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps} />
                </div>
              </div>

              <table className="table">
                <thead className='thead-dark'>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tick</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Change</th>
                    <th scope="col">Volume</th>
                    <th scope="col">Avg Vol</th>
                    <th scope="col">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.rows.map(row => (
                    <tr onClick={() => this.handleRowClick(row.tick, row.name, row.change)} className="watchListEntries">
                      <td className="vcenter"><input type="checkbox" id="blahA" value="1"/></td>
                      <td className="watchListRow">{row.tick}</td>
                      <td className="watchListRow">{row.name}</td>
                      <td className="watchListRow">{row.price}</td>
                      <td className={row.change > 0 ? 'bullishTrend' : (row.change < 0 ? 'bearishTrend' : 'watchListRow')}>{row.change + " %"}</td>
                      <td className="watchListRow">{row.volume}</td>
                      <td className="watchListRow">{row.avgVol}</td>
                      <td className={row.change > 0 ? 'bullishTrend' : (row.change < 0 ? 'bearishTrend' : 'watchListRow')}>{row.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    {
      showModal ?
        <OrderPopup type={selectedStateModal} tick={graphTick} name={graphName} callback={this.modalCallback} percentChange={percentChange} />
        :
        null
    }
    </div>
		)
	}
}

TableList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(TableList);
