import React from "react";
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";

function icoTableList({ ...props }) {
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle="All ICO's Table"
          // cardSubtitle="Here is a subtitle for this table"
          content={
            <Table
              tableHeaderColor="primary"
            //   tableHead={["Name", "ETA", "TEAM", "CONCEPT", "WHITE", "SOCIAL"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                // ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738","Dakota Rice", "Niger", "Oud-Turnhout", "$36,738", "$36,738"],
                // ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                // ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                // ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                // ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
            />
          }
        />
      </ItemGrid>
      {/* <ItemGrid xs={12} sm={12} md={12}>
        <RegularCard
          cardTitle="UPCOMING Table"
          // cardSubtitle="Here is a subtitle for this table"
          content={
            <Table
              tableHeaderColor="primary"
            //   tableHead={["Name", "ETA", "OVERALL", "SOCIAL"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738",],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738",],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738",],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738",],
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738",],
              ]}
            />
          }
        />
      </ItemGrid> */}
    </Grid>
  );
}

export default icoTableList;
