import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";

import navRoutes from "routes/appMain.jsx";
import appRoutes from "routes/app.jsx"

import appStyle from "variables/styles/appStyle.jsx";

import image from "assets/img/black.png";
import logo from "assets/img/bitcoin.png";

const PrivateRoute = ({path, isAuthenticated, ...rest}) => (
  isAuthenticated
  ?
  <Route path={path} {...rest} />
  :
  <Redirect from={path} to="/login" />
);

var userData = localStorage.getItem('user');
let isAuthenticated = false;
if (userData) {
  isAuthenticated = true;
}

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      else if (prop.path === "/login")
        return <Route path={prop.path} component={prop.component} key={key} />
      return <PrivateRoute path={prop.path} component={prop.component} key={key} isAuthenticated={isAuthenticated}/>;
    })}
  </Switch>
);

class AppMain extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    try {
      this.refs.mainPanel.scrollTop = 0;
    } catch (error) {
      // Do nothing
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    const path = this.props.location.pathname;
    return (
      <div>
        {
          path === "/signup" || path === "/login" ?
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div> :
            <div className={classes.wrapper}>
              <Sidebar
                routes={navRoutes}
                logoText={"Crypto Manager"}
                logo={logo}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                open={this.state.mobileOpen}
                color="blue"
                {...rest}
              />
              <div className={classes.mainPanel} ref="mainPanel">
                <Header
                  routes={navRoutes}
                  handleDrawerToggle={this.handleDrawerToggle}
                  {...rest}
                />

                {this.getRoute() ? (
                  <div className={classes.content}>
                    <div className={classes.container}>{switchRoutes}</div>
                  </div>
                ) : (
                  <div className={classes.map}>{switchRoutes}</div>
                )}
                {this.getRoute() ? <Footer /> : null}
              </div>
            </div>
        }
      </div>
    );
  }
}

AppMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(AppMain);
