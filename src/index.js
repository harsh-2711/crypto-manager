import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

let baseURL;
if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_BASE_URL_PROD;
} else {
  baseURL = process.env.REACT_APP_BASE_URL_DEV;
}
console.log(baseURL);

ReactDOM.render(
  <Router history={hist} baseName={baseURL}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);
