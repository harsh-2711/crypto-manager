import React from "react";
import ReactDom from 'react-dom';

import { Table } from "components";

describe("Table component", () => {
    test('renders without crashing',()=>{
        const div = document.createElement('div');
        ReactDom.render(
        <Table
        tableHeaderColor="primary"
        tableData={[
            ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
        ]}
          />,div)
    })
});