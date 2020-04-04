import React, { Component } from 'react'  
import axios from 'axios';  
import {Doughnut} from 'react-chartjs-2';

export class DoughnutChart extends Component {

	constructor(props) {
		super(props);
		this.state = {Data: {}};
	}

	componentDidMount() {
		let userFormData = new FormData()
		userFormData.set('email', 'abc@123.com');
		userFormData.set('aadhar_card_no', 'abc123');
		userFormData.set('pan_card_no', 'abc123');
		axios.post(
			'/user/portfolio/get', 
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
			
			// TODO: Handle more color options
			let backgroundColors = ['#6200EA', '#304FFE', '#006064', '#004D40', '#AEEA00', '#00C853', '#F57F17', '#DD2C00', '#3E2723', '#37474F'];
			
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
				}
			})
		})
		.catch(response => {
			console.log(response);
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
									console.log(elems[0]._index);
								}} />
			</div>
		)
	}
}

export default DoughnutChart;