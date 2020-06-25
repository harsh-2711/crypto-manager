import React from "react";
import ReactDom from 'react-dom';

import OrderPopup from "../components/Popup/OrderPopup"

describe("OrderPopup component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');    
        ReactDom.render(
            <OrderPopup 
            type="sell"
            tick="LTC" 
            name="Litecoin" 
            percentChange="3"
        />,div)
    })
});