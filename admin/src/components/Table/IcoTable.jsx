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

function customTable({ ...props }) {
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
                    Name 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    ETA 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    TEAM 
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    CONCEPT
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    WHITE
                  </TableCell>
                  <TableCell className={classes.tableCell }>
                    {/* {prop} */}
                    SOCIAL
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

export default withStyles(tableStyle)(customTable);
