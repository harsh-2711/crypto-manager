import React, { Component } from 'react'  
import axios from 'axios';  
import {Doughnut, Chart} from 'react-chartjs-2';

export class DoughnutChart extends Component {

	constructor(props) {
		super(props);
		this.state = {Data: {}, Investment: {}};
	}

	componentDidMount() {
		let userFormData = new FormData()
		userFormData.set('email', 'abc@123.com');
		userFormData.set('aadhar_card_no', 'abc123');
		userFormData.set('pan_card_no', 'abc123');
		
		var proxy = ""
		if(process.env.NODE_ENV === "production")
			proxy = "https://crypto-manager-prod.herokuapp.com"
		
		axios.post(
			proxy + '/user/portfolio/get', 
			userFormData
		)
		.then(res => {
			const data = (res.data)
			let coins = [];
			let quantity = [];
			let investmentPrice = [];
			var totalInvestment = 0
			data.forEach(record => {
				coins.push(record.tick);
				quantity.push(record.quantity);
				investmentPrice.push(record.investmentPrice);
				totalInvestment += record.investmentPrice;
			})

			if(totalInvestment < 999999)
				totalInvestment = Math.abs(totalInvestment) > 999 ? Math.sign(totalInvestment)*((Math.abs(totalInvestment)/1000).toFixed(1)) + 'K' : Math.sign(totalInvestment)*Math.abs(totalInvestment)
			else
				totalInvestment = Math.sign(totalInvestment)*((Math.abs(totalInvestment)/1000000).toFixed(1)) + 'M'
			
			// TODO: Handle more color options
			let backgroundColors = ['#1b9868', '#ffd700', '#ec6d10', '#68228b', '#1134A6', '#Cs1807'];
			
			this.setState({
				Data: {
					labels: coins,
					datasets: [
						{
							label: 'Portfolio',
							data: investmentPrice,
							backgroundColor: backgroundColors
						}
					]
				},
				Investment: totalInvestment
			})

			const context = this;

			Chart.pluginService.register({
				beforeDraw: function(chart) {
				var width = chart.chart.width,
					height = chart.chart.height,
					ctx = chart.chart.ctx;
			
				ctx.restore();
				var fontSize = (height / 114).toFixed(2);
				ctx.font = fontSize + "em sans-serif";
				ctx.textBaseline = "middle";
				
				var text = context.state.Investment,
					textX = Math.round((width - ctx.measureText(text).width) / 2),
					textY = height / 1.9;
			
				ctx.fillText(text, textX, textY);
				ctx.save();
				}
			});
		})
		.catch(err => {
			console.log(err);
		});
	}

	render() {
		return (
			<div>
				<Doughnut data={this.state.Data} width={400} height={400}
							options={{
								responsive: true,
								maintainAspectRatio: true }}
								onElementsClick={elems => {
									try {
										console.log(elems[0]._index);
									} catch (error) {
										console.log(error)
									}
								}} />
			</div>
		)
	}
}

export default DoughnutChart;