import React from "react";
import ReactDom from 'react-dom';
import {Hidden} from "material-ui";

import { HeaderLinks } from "components";

describe("HeaderLink component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <Hidden smDown implementation="css">
            <HeaderLinks />
        </Hidden>,div)
    })
});