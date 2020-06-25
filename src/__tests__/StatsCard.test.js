import React from "react";
import ReactDom from 'react-dom';
import {ContentCopy, LocalOffer} from "material-ui-icons";

import { StatsCard } from "components";

describe("StatsCard component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <StatsCard
        // classes: PropTypes.object.isRequired
        icon = {ContentCopy}
        iconColor = "red"
        title = "testing title"
        description = "testing description"
        small = "GB"
        statIcon = {LocalOffer}
        statIconColor = "gray"
        />,div)
    })
});