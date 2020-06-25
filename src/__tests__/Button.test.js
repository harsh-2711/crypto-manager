import React from "react";
import ReactDom from 'react-dom';
import { Grid } from "material-ui";
import {ContentCopy, LocalOffer} from "material-ui-icons";

import { Button } from "components";

describe("Button component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <Button
        color = "white"
        children = "click me"
        round = {true}
        fullWidth = {false}
        disabled = {false}
        />,div)
    })
});