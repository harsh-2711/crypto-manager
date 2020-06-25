import React from "react";
import ReactDom from 'react-dom';
import { Grid } from "material-ui";

import { RegularCard,Small,ItemGrid } from "components";

describe("RegularCard component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <RegularCard
        headerColor= "purple"
        cardTitle = "testing card title"
        cardSubtitle = "testing card subtitle"
        content = {
            <div>
                <Grid container justify="center">
                <ItemGrid xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
                    <h5>
                    Notifications Places
                    <Small>Click to view notifications</Small>
                    </h5>
                </ItemGrid>
                </Grid>
            </div>
        }
        footer = {
            <div>
                <h4> footer of the card</h4>
            </div>
        }
        />,div)
    })
});