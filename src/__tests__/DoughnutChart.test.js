import React from "react";
import ReactDom from 'react-dom';

import DoughnutChart from "../components/Charts/Doughnut";

describe("DoughnutChart component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(<DoughnutChart />,div)
    })
});