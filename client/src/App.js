import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./componments/layouts/Navbar";
import Landing from "./componments/layouts/Landing";
import Register from "./componments/auth/Register";
import Login from "./componments/auth/Login";
import Alert from './componments/layouts/Alert'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store = {store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
