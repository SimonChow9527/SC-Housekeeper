import React, { Component } from "react";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import Authenticator from "./component/Authenticator.js";
import HomePage from "./component/HomePage.js";
import ItemDetail from "./component/ItemDetail.js";
import ItemList from "./component/ItemList.js";
import UserChangePassword from "./component/UserChangePassword.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as actionCreators from "../src/actions/actionCreators.js";
import "./styles/HomepageStyle.scss";
import "react-dropdown/style.css";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";

class SCHousekeeper extends Component {
  async componentDidMount() {
    Auth.currentAuthenticatedUser()
      .catch(err => {
        return;
      })
      .then(data => {
        if (data != null) {
          this.props.setUser(data);
          this.props.userAuthenticator(true);
        }
      });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/itemdetail/:ID" component={ItemDetail} />
            <Route exact path="/itemlist" component={ItemList} />
            <Route exact path="/login" component={Authenticator} />
            <Route
              exact
              path="/changepassword"
              component={UserChangePassword}
            />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>

        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticator: data => dispatch(actionCreators.userAuthenticator(data)),
    setUser: data => dispatch(actionCreators.setUser(data))
  };
};

export default connect(null, mapDispatchToProps)(SCHousekeeper);
