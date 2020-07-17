import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./componments/layouts/Landing";
import Register from "./componments/auth/Register";
import Login from "./componments/auth/Login";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const App = () => (
  <Router>
  <Fragment>
    <Navbar />
    <Route exact path = "/" component = {Landing}/>
    <section className = "container">
      <Switch>
        <Route exact path = "/register" component = {Register}></Route>
        <Route exact path = "/login" component = {login}></Route>
      </Switch>
    </section>
  </Fragment>

  </Router>
);

export default App;
