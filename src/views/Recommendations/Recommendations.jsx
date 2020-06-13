import React from "react";
import { Card } from "material-ui";
import { CardContent, Typography } from "material-ui";
import "../../variables/css/recommendationsStyle.css";
import { Grid } from "material-ui";
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ChartistGraph from "react-chartist";

import {
	emailsSubscriptionChart,
	completedTasksChart
  } from "variables/charts";

  import {
	ChartCard,
	ItemGrid
  } from "components";

  import {
	AccessTime,	
  } from "material-ui-icons";
import { Button } from "material-ui";
  
class Recommendations extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			shouldOpen: false,
			value: '',
			suggestions: [],
			tickArr: [],
			cryptoArr: [],
			sentiment: "Bullish",
			currTick: "",
			currName: "",
			close: 0,
			open: 0,
			high: 0,
			low: 0,
			newsAvailable: false,
			descArr: [],
			titleArr: [],
			linkArr: [],
			rows: []
		}
	}

	componentDidMount() {
		var proxy = ""
		if(process.env.NODE_ENV === "production")
			proxy = "https://crypto-manager-prod.herokuapp.com"

		axios.get(
			proxy + '/coins/data/aws'
		  )
		  .then(response => {
			let tickArr = []
			let cryptoArr = []
			for(let i in response['data']) {
				let tickName = response['data'][i]['tick'];
				let crypto = response['data'][i]['name'];
				tickArr.push({name: tickName});
				cryptoArr.push(crypto);
			}
			this.setState({
			  tickArr,
			  cryptoArr
			})
		});
	}

	getSuggestionValue = (suggestion) => {
		let tick = suggestion.name;
		var counter = 0
		for(var i in this.state.tickArr) {
		if((this.state.tickArr[i].name).toLowerCase() === (tick.toString()).toLowerCase())
			break;
		counter++;
		}
		this.setState({
			currTick:  this.state.tickArr[counter].name,
			currName: this.state.cryptoArr[counter]
		});

		var proxy = ""
		if(process.env.NODE_ENV === "production")
			proxy = "https://crypto-manager-prod.herokuapp.com"

		var data = new FormData();
		data.set('tick', suggestion.name);

		axios.post(
			proxy + '/crypto/signal',
			data
		)
		.then(res => {
			if(res['data'] !== 'Error') {
				var counter = 0;
				for(var i in res['data']) {
					if (res['data'][i]['sentiment'] !== undefined) {
						if (res['data'][i]['sentiment'] === 'bullish')
							counter++;
						else
							counter--;
					}
				}
				if (counter > 0)
					this.setState({sentiment: 'Bullish'});
				else if (counter < 0)
					this.setState({sentiment: 'Bearish'});
				else
					this.setState({sentiment: 'Neutral'});
			} else {
				counter = Math.random() * (1 - (-1)) + (-1); 
				if (counter > 0)
					this.setState({sentiment: 'Bullish'});
				else if (counter < 0)
					this.setState({sentiment: 'Bearish'});
				else
					this.setState({sentiment: 'Neutral'});
			}
		})

		data = new FormData();
		data.set('tick', suggestion.name);
		data.set('currency', 'USD');
		data.set('limit', 1);

		axios.post(
			proxy + "/crypto/data/daily",
			data
		)
		.then(res => {
			try {
				let close = res['data']['Data'][0]['close'];
				let open = res['data']['Data'][0]['open'];
				let high = res['data']['Data'][0]['high'];
				let low = res['data']['Data'][0]['low'];

				this.setState({
					close,
					open,
					high,
					low
				});
			} catch (error) {
				// pass
			}
		})

		data = new FormData()
		data.set('name', (this.state.currName).toLowerCase());

		axios.post(
			proxy + "/coins/news",
			data
		)
		.then(res => {
			if(res['data'] === 'Page Not Found' || res['data']['status'] === 404) {
				axios.get(
					proxy + "/crypto/news"
				)
				.then(res => {
					let data = res['data'];
					let descArr = [];
					let titleArr = [];
					let linkArr = [];
					var counter = 0;
					for(var i in data) {
						descArr.push(data[i]['description']);
						titleArr.push(data[i]['title']);
						linkArr.push(data[i]['sourceDomain']);
						counter++;

						if(counter === 3)
							break;
					}
					this.setState({
						descArr,
						titleArr,
						linkArr,
						newsAvailable: true
					})
					this.handleNews();
				})
				.catch(err => {
					this.setState({
						newsAvailable: false
					})
				})
			} else {
				let data = res['data'];
				let descArr = [];
				let titleArr = [];
				let linkArr = [];
				var counter = 0;
				for(var i in data) {
					descArr.push(data[i]['description']);
					titleArr.push(data[i]['title']);
					linkArr.push(data[i]['sourceDomain']);
					counter++;

					if(counter === 3)
						break;
				}

				this.setState({
					descArr,
					titleArr,
					linkArr,
					newsAvailable: true
				})

				this.handleNews();
			}
		})

		this.setState({shouldOpen: true});
		return suggestion.name;
	  }

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

		handleNews = () => {
			var rowsArr = []
			for(var i in this.state.titleArr) {
				const row = {
					title: this.state.titleArr[i],
					desc: this.state.descArr[i],
					link: this.state.linkArr[i]
				}
				rowsArr.push(row);
			}
			this.setState({
				rows: rowsArr
			})
		  };

	render() {
		const { shouldOpen, value, suggestions, sentiment, currName, currTick, close, open, high, low, newsAvailable } = this.state;

		const inputProps = {
			placeholder: "Search",
			value,
			onChange: this.onChange,
			// TODO: Need to figure out responsive width of search bar
			style: { width: '400%',
					height: '200%',
					minWidth: '100%'}
		  };
		return (
			<div className="local-bootstrap">
				<Card>
					<div className="mainRecommendationsContainer">
						<CardContent>
							<Typography variant="h1" component="h1">Investment Recommendations</Typography>
						</CardContent>

						<CardContent>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
								<span className="input-group-text" id="basic-addon1">Load Quote</span>
								</div>
								<div aria-describedby="basic-addon1">
									<div className="recommendationsSearchBar">
										<Autosuggest 
											suggestions={suggestions}
											onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
											onSuggestionsClearRequested={this.onSuggestionsClearRequested}
											getSuggestionValue={this.getSuggestionValue}
											renderSuggestion={this.renderSuggestion}
											inputProps={inputProps}
											wrapperStyle={{ width: 1000}} />
									</div>
								</div>
							</div>
						</CardContent>

						{
							shouldOpen ?
							<div>
								<CardContent>
									<Grid container>
										<ItemGrid xs={12} sm={6} md={6}>
											<Typography variant="h3" component="h3">Latest Quote</Typography>
											<Card>
												<div className="latestQuoteCard">
													<CardContent>
														<div className="recommendationHeader">
															<Typography variant="h3" component="h3" style={{
																fontWeight: 800,
																color: '#000000'
															}}>
																{currTick + ": "}
															</Typography>

															<div className="cryptoName">
																<Typography variant="h3" component="h3" style={{
																	fontWeight: 800,
																	color: '#000000'
																}}>
																	{currName}
																</Typography>
															</div>
														</div>
													</CardContent>

													<CardContent>
														<div>
															<div className="recommendationHeader">
																<Typography variant="h5" component="h5" >
																	Close: 
																</Typography>

																<div className="cryptoName1">
																	<Typography variant="h5" component="h5" style={{
																		fontWeight: 600
																	}}>
																		{close}
																	</Typography>
																</div>
															</div>
														</div>

														<div>
															<div className="recommendationHeader">
																<Typography variant="h5" component="h5" >
																	Open: 
																</Typography>

																<div className="cryptoName2">
																	<Typography variant="h5" component="h5" style={{
																		fontWeight: 600
																	}}>
																		{open}
																	</Typography>
																</div>
															</div>
														</div>

														<div>
															<div className="recommendationHeader">
																<Typography variant="h5" component="h5" >
																	High: 
																</Typography>

																<div className="cryptoName3">
																	<Typography variant="h5" component="h5" style={{
																		fontWeight: 600
																	}}>
																		{high}
																	</Typography>
																</div>
															</div>
														</div>

														<div>
															<div className="recommendationHeader">
																<Typography variant="h5" component="h5" >
																	Low: 
																</Typography>

																<div className="cryptoName4">
																	<Typography variant="h5" component="h5" style={{
																		fontWeight: 600
																	}}>
																		{low}
																	</Typography>
																</div>
															</div>
														</div>

													</CardContent>
												</div>

												<Button
													variant="contained"
													style={{
														borderRadius: 5,
														backgroundColor: "#0080FF",
														padding: "15px 30px",
														fontSize: "18px",
														color: '#ffffff',
														width: '90%',
														margin: '20px'
													}}
													>
													Show Previous Quotes
												</Button>
											</Card>

											{/* News */}
											<div className="newsHeader">
												<Typography variant="h3" component="h3" style={{
													marginBottom: '20px'
												}}>Latest News</Typography>
											</div>
											<Card>
												{
													newsAvailable ?
													<div className="mainRecommendationsContainer">
														<div>
															{
																this.state.rows.map(row => (
																	<div>
																		<Typography variant="h3" component="h3" style={{
																			marginTop: '10px'
																		}}>{row.title}</Typography>
																		<Typography variant="h6" component="h6" style={{
																			marginTop: '20px',
																			textTransform: 'capitalize'
																		}}>{row.desc}</Typography>
																		<a href={"https://" + row.link}>{row.link}</a>
																		<Typography style={{
																			marginBottom: 40
																		}}></Typography>
																	</div>
																))
															}
														</div>

														<Button
															variant="contained"
															style={{
																borderRadius: 5,
																backgroundColor: "#0080FF",
																padding: "15px 30px",
																fontSize: "18px",
																color: '#ffffff',
																width: '90%',
																margin: '20px'
															}}
															>
															Show All
														</Button>
													</div>
													 :
													<Typography variant="h4" component="h4" style={{
														padding: '30px'
													}}> No news available at present</Typography>
												}
											</Card>
											
										</ItemGrid>

										<ItemGrid xs={12} sm={6} md={6}>
											<div className="dataOverview">
												<Grid container spacing={1}>
												{/* Overall score */}
												<Grid container item xs={12} spacing={3} className="avgScoreGrid">
													<div className="avgScore">
													<div>
														Avgerage Sentiment: 
														</div>
													<div className={this.state.sentiment === "Bearish" ? "bearishScore" : "bullishScore"}>
														{sentiment}
													</div>
													</div>
												</Grid>
												{/* Technical Analysis */}
												<Grid container item xs={12} spacing={3}>
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
												<Grid container item xs={12} spacing={3}>
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
								</CardContent>
							</div> :
							<div className="noActivity">
							</div>
						}

					</div>
				</Card>
			</div>
		)
	}
};

export default Recommendations;