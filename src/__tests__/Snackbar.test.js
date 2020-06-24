import React from "react";
import ReactDom from 'react-dom';
import {LocalOffer} from "material-ui-icons";

import { Snackbar } from "components";

describe("Snackbar component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <Snackbar
        message={
        'Testing Snackbar'
        }
        color="danger"
        close = {false}
        icon = {LocalOffer}
        place = "tl"
        open = {true}
        />,div)
    })
});