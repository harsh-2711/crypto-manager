import React, { Component } from 'react'  
import axios from 'axios';  
import {Doughnut} from 'react-chartjs-2';

export class DoughnutChart extends Component {

	constructor(props) {
		super(props);
		this.state = {Data: {}};
	}

	componentDidMount() {
		axios.get('/temp/data')
		.then(res => {
			const data = (res.data)['data']
			let coins = [];
			let perc = [];
			data.forEach(record => {
				coins.push(record.coin);
				perc.push(record.percentage);
			})
			
			this.setState({
				Data: {
					labels: coins,
					datasets: [
						{
							label: 'Portfolio',
							data: perc,
							backgroundColor: [
								'#FF0000',
								'#00FF00',
								'#0000FF'
							]
						}
					]
				}
			})
		})
	}

	render() {
		return (
			<div>
				<Doughnut data={this.state.Data}
							options={{ maintainAspectRatio: false }}/>
			</div>
		)
	}
}

export default DoughnutChart;