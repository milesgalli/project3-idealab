import React, { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./componments/layouts/Navbar";
import Landing from "./componments/layouts/Landing";
import Routes from './componments/routing/Routes'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Register from "./componments/auth/Register";
// import Login from "./componments/auth/Login";
// import Alert from "./componments/layouts/Alert";


// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
            <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
            </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
