import React from "react";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import Register from "./component/Register.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./styles/HomepageStyle.scss";

function SCHousekeeper() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Register} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default SCHousekeeper;
