import React from "react";
import ReactDom from 'react-dom';

import {Doughnut, Chart} from 'react-chartjs-2';

describe("DoughnutChart component", () => {
	const div = document.createElement('div');
	const Data = {
		labels: ['LTCH', 'ETH', 'BTC'],
		datasets: [
			{
				label: 'Portfolio',
				data: [66000, 145000, 845000],
				backgroundColor: ['#1b9868', '#ffd700', '#ec6d10']
			}
		]
	};

	const comp = ReactDom.render(
		<Doughnut 
			data={Data} width={400} height={400}
			options={{
				responsive: true,
				maintainAspectRatio: true }}
				onElementsClick={elems => {
					try {
						console.log(elems[0]._index);
					} catch (error) {
						console.log(error)
					}
				}} 
		/>,div);
	test('Crypto currencies shown in DoughnutChart matches with actual Crypto currencies of User',()=>{	
		expect(comp.props.data.labels).toEqual(Data.labels)
	})
	test('Amount of Investment shown in DoughnutChart matches with actual Investment of User',()=>{	
		expect(comp.props.data.datasets[0].data).toEqual(Data.datasets[0].data)
	})
	test('Colour assigned to each crypto currency is same as passed through props',()=>{	
		expect(comp.props.data.datasets[0].backgroundColor).toEqual(Data.datasets[0].backgroundColor)
    })
});