import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility,
  
} from "material-ui-icons";
import { withStyles, Grid, Card, CardHeader, CardContent, Typography } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "variables/styles/dashboardStyle";
import "variables/css/dashboardStyle.css"

import DoughnutChart from "../../components/Charts/Doughnut";

class Dashboard extends React.Component {
  state = {
    value: 0,
    sentiment: "Bullish"
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        {/* TODO: Make chart position static w.r.t other components */}
        <Card className="doughnutCard">
          <CardContent>
          <Typography variant="title" component="h1">
            Portfolio
        </Typography>
          </CardContent>
          <Grid container> 
            {/* Left Side */}
            <ItemGrid xs={12} sm={6}>
              <div className="doughnutChart">
                <DoughnutChart />
              </div>
            </ItemGrid>
            {/* Right Side */}
            <ItemGrid xs={12} sm={6}>
              <div className="dataOverview">
                <Grid container>
                  {/* Overall score */}
                  <Grid container item xs={12} className="avgScoreGrid">
                    <div className="avgScore">
                      <div>
                        Avgerage Sentiment: 
                        </div>
                      <div className={this.state.sentiment === "Bearish" ? "bearishScore" : "bullishScore"}>
                        {this.state.sentiment}
                      </div>
                    </div>
                  </Grid>
                  {/* Technical Analysis */}
                  <Grid container item xs={12}>
                    <ChartCard
                      chart={
                        <ChartistGraph
                          className="ct-chart"
                          data={emailsSubscriptionChart.data}
                          type="Bar"
                          options={emailsSubscriptionChart.options}
                          responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                          listener={emailsSubscriptionChart.animation}
                        />
                      }
                      chartColor="orange"
                      title="Sentiment Analysis"
                      text="Last Year Performance"
                      statIcon={AccessTime}
                      statText="Updated 2 minutes ago"
                    />
                  </Grid>
                  {/* Sentimental Analysis */}
                  <Grid container item xs={12}>
                  <ChartCard
                    chart={
                      <ChartistGraph
                        className="ct-chart"
                        data={completedTasksChart.data}
                        type="Line"
                        options={completedTasksChart.options}
                        listener={completedTasksChart.animation}
                      />
                    }
                    chartColor="red"
                    title="Technical Analysis"
                    text="Last Year Performance"
                    statIcon={AccessTime}
                    statText="Updated 2 minutes ago"
                  />
                  </Grid>
                </Grid>
              </div>
            </ItemGrid>
          </Grid>
        </Card>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="Crypto Currencies"
              description="1600/2000"
              // small="GB"
              statIcon={LocalOffer}
              statText="Tracked from Coindesk"
              // statIconColor="danger"
              // statLink={{ text: "Get More Space...", href: "#pablo" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Active ICO's"
              description="3"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="blue"
              title="Upcoming ICO's"
              description="5"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="red"
              title="Ended ICO's"
              description="14"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="Current P/L"
              description="+$7.5K"
              statIcon={LocalOffer}
              statText="Tracked from Wallet"
            />
          </ItemGrid>
        </Grid>
        {/* <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Live Chart"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    55%
                  </span>{" "}
                  increase in crypto value.
                </span>
              }
              statIcon={AccessTime}
              statText="Updated 4 minutes ago"
            />
          </ItemGrid>
        </Grid> */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
