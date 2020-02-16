import React from "react";
import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "material-ui";

import PropTypes from "prop-types";

import tableStyle from "variables/styles/tableStyle";

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow>
              {/* {tableHead.map((prop, key) => {
                return ( */}
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    Rank 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    Name 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    Price 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    MarketCap 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    Volume(24H)
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    Circulating 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    1h 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    24h
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop } */}
                    Weekly 
                  </TableCell>

                {/* );
              })} */}
            </TableRow>
          </TableHead>
         ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

// CustomTable.defaultProps = {
//   tableHeaderColor: "gray"
// };

// CustomTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray"
//   ]),
  // tableHead: PropTypes.arrayOf(PropTypes.string),
  // tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
// };

export default withStyles(tableStyle)(CustomTable);
