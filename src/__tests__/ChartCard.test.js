import React from "react";
import ReactDom from 'react-dom';
import ChartistGraph from "react-chartist";
import { AccessTime } from "material-ui-icons";

import ChartCard from '../components/Cards/ChartCard';
import { emailsSubscriptionChart } from "../variables/charts";


test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render( <
        ChartCard classes = {
            { "card": "chartCard" },
            { "cardHeader": "chart" },
            { "cardContent": "data over view" },
            { "cardTitle": "for test" },
            { "cardCategory": "primary" },
            { "cardActions": "none" },
            { "cardStats": "open" },
            { "cardStatsIcon": "none" },
            { "cardStatsLink": "url" }
        }
        chart = { <
            ChartistGraph
            className = "ct-chart"
            data = { emailsSubscriptionChart.data }
            type = "Bar"
            options = { emailsSubscriptionChart.options }
            responsiveOptions = { emailsSubscriptionChart.responsiveOptions }
            listener = { emailsSubscriptionChart.animation }
            />
        }
        chartColor = "orange"
        title = "Sentiment Analysis"
        text = "Last Year Performance"
        statIcon = { AccessTime }
        statText = "Updated 2 minutes ago" /
        >
        , div)
})