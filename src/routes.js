import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";
import OpenDocument from "./views/opendocument";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/document">
          <OpenDocument/>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
