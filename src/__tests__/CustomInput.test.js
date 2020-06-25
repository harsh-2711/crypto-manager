import React from "react";
import ReactDom from 'react-dom';
import { Grid } from "material-ui";
import {ContentCopy, LocalOffer} from "material-ui-icons";

import { CustomInput } from "components";

describe("CustomInput component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <CustomInput
        labelText = "label Text"
        id = "customInput"
        inputProps={{
            placeholder: "Search",
            inputProps: {"aria-label": "Search"}
        }}
        formControlProps={{
            className: "class name"
          }}
        error = {false}
        success = {true}
        />,div)
    })
});