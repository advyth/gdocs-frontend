import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";

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
      </Switch>
    </Router>
  );
};

export default Routes;
