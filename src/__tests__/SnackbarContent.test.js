import React from "react";
import ReactDom from 'react-dom';
import {LocalOffer} from "material-ui-icons";

import { SnackbarContent } from "components";

describe("SnackbarContent component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <SnackbarContent
        message={
        'Testing SnackbarContent'
        }
        color="danger"
        close = {false}
        icon = {LocalOffer} 
        />,div)
    })
});