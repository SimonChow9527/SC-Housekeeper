import React, { Component } from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Authenticator from "./component/Authenticator";
import HomePage from "./component/HomePage";
import ItemDetail from "./component/ItemDetail";
import ItemList from "./component/ItemList";
import ItemCreator from "./component/ItemCreator";
import PageNotFound from "./component/PageNotFound";
import UserPanel from "./component/UserPanel";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as actionCreators from "../src/actions/actionCreators";
import "./styles/HomepageStyle.scss";
import "react-dropdown/style.css";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";

class SCHousekeeper extends Component {
  async componentDidMount() {
    Auth.currentAuthenticatedUser()
      .catch((err) => {
        return;
      })
      .then((user) => {
        if (user) {
          this.props.setUser(user);
          this.props.userAuthenticator(true);
          this.props.loadItems(user);
        }
      });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/itemdetail/:ID" component={ItemDetail} />
            <Route path="/itemlist" component={ItemList} />
            <Route path="/login" component={Authenticator} />
            <Route path="/createitem" component={ItemCreator} />
            <Route path="/userpanel" component={UserPanel} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userAuthenticated: state.authReducer.userAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userAuthenticator: (data) =>
      dispatch(actionCreators.userAuthenticator(data)),
    setUser: (data) => dispatch(actionCreators.setUser(data)),
    loadItems: (data) => dispatch(actionCreators.loadItems(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SCHousekeeper);
