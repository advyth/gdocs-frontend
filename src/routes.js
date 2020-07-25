import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";
import OpenDocument from "./views/opendocument";
import Unauthorized from "./error_pages/unauthorized";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/document">
          <OpenDocument/>
        </Route>
        <Route component={Unauthorized}/>
      </Switch>
    </Router>
  );
};

export default Routes;
