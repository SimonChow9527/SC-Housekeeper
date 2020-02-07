import React, { Component } from "react";
import MyButton from "./utility/MyButton.js";
import { Link } from "react-router-dom";
import "../styles/NavStyle.scss";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
import { Auth } from "aws-amplify";

class Navbar extends Component {
  render() {
    let logout = (
      <label>
        hello {this.props.cognitoUser.attributes.name}{" "}
        <MyButton
          text="log out"
          path="/"
          handleClick={() => {
            Auth.signOut().catch(err => console.log(err));
            this.props.userAuthenticator(false);
          }}
        />
      </label>
    );
    return (
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <span>SCPantryGuru</span>
          </Link>
        </div>
        <div className="navbar-test">
          <MyButton
            text="testItem"
            path="/itemdetail/2"
            handleClick={() => {}}
          />
          <MyButton text="testList" path="/itemlist" handleClick={() => {}} />
        </div>
        <div className="navbar-icon">
          {this.props.userAuthenticated ? (
            logout
          ) : (
            <MyButton text="Login" path="/login" handleClick={() => {}} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthenticated: state.authReducer.userAuthenticated,
    cognitoUser: state.authReducer.cognitoUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticator: data => dispatch(actionCreators.userAuthenticator(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
