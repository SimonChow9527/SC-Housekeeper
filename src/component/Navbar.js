import React, { Component } from "react";
import MyButton from "./utility/MyButton.js";
import { Link } from "react-router-dom";
import "../styles/NavStyle.scss";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
import { Auth } from "aws-amplify";
import Dropdown from "react-dropdown";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToChangePassword: false
    };
    this.handleLogoutDropdown = this.handleLogoutDropdown.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }

  handleLogoutDropdown(value) {
    switch (value.value) {
      case "Log out": {
        this.userLogout();
        return;
      }
      case "Change password": {
        this.props.history.push("/changepassword");
        return;
      }

      default:
        return;
    }
  }
  userLogout() {
    Auth.signOut().catch(err => console.log(err));
    this.props.userAuthenticator(false);
    this.props.setUser(null);
    this.props.history.push("/");
  }

  render() {
    let dropdownOptions = ["Change password", "Log out"];

    let dropdown =
      this.props.userAuthenticated && this.props.cognitoUser != null ? (
        <Dropdown
          options={dropdownOptions}
          placeholder={"Hello " + this.props.cognitoUser.attributes.name}
          onChange={value => {
            this.handleLogoutDropdown(value);
          }}
        />
      ) : (
        ""
      );
    return (
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <span>SCPantryGuru</span>
          </Link>
        </div>
        <div className="navbar-icon">
          {this.props.userAuthenticated ? (
            dropdown
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
    userAuthenticator: data => dispatch(actionCreators.userAuthenticator(data)),
    setUser: data => dispatch(actionCreators.setUser(data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
