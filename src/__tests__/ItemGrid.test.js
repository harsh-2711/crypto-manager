import React from "react";
import ReactDom from 'react-dom';

import { ItemGrid } from "components";

describe("ItemGrid component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <ItemGrid xs={12} sm={6}>
        <div className="test class">
            <h4>testing ItemGrid</h4>
        </div>
        </ItemGrid>,div)
    })
});