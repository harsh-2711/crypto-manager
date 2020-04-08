import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden
} from "material-ui";
import { Person, Notifications, Dashboard, Search } from "material-ui-icons";

import { CustomInput, IconButton as SearchButton } from "components";

import headerLinksStyle from "variables/styles/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseNone = () => {

  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <CustomInput
          formControlProps={{
            className: classes.top + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <SearchButton
          color="white"
          aria-label="edit"
          customClass={classes.top + " " + classes.searchButton}
          >
          <Search className={classes.searchIcon} />
        </SearchButton>
        {/* <IconButton
          color="inherit"
          aria-label="Dashboard"
          className={classes.buttonLink}
          >
          <Dashboard className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </IconButton> */}

        <ClickAwayListener  onClickAway={open?this.handleClick:this.handleCloseNone}>
          <Manager style={{ display: "inline-block" }}>
            <Target>
              <IconButton
                color="inherit"
                aria-label="Notifications"
                aria-owns={open ? "menu-list" : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={classes.buttonLink}
              >
                <Notifications className={classes.links} />
                <span className={classes.notifications}>5</span>
                <Hidden mdUp>
                  <p onClick={this.handleClick} className={classes.linkText}>
                    Notification
                  </p>
                </Hidden>
              </IconButton>
            </Target>
            <Popper
              placement="bottom-start"
              eventsEnabled={open}
              className={
                classNames({ [classes.popperClose]: !open }) +
                " " +
                classes.pooperResponsive
              }
            >
                <Grow
                  in={open}
                  id="menu-list"
                  style={{ transformOrigin: "0 0 0" }}
                >
                  <Paper className={classes.dropdown}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Your order of 10 BTC is completed
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Your order of 5 ETH is rejected
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Your order of 10 BTC is placed
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Your order of 2 LTC is completed
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Your order of 2 LTC is placed
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Grow>
            </Popper>
          </Manager> 
        </ClickAwayListener>
        <IconButton
          color="inherit"
          aria-label="Person"
          className={classes.buttonLink}
          >
          <Person className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </IconButton>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
