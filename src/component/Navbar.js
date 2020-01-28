import React, { Component } from "react";
import MyButton from "./utility/MyButton.js";
import { Link } from "react-router-dom";
import "../styles/NavStyle.scss";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <span>SCPantryGuru</span>
          </Link>
        </div>
        <div className="navbar-test">
          <MyButton
            text={this.props.userLoggedIn.toString()}
            path="/"
            handleClick={() => {}}
          />
          <MyButton
            text="testItem"
            path="/itemdetail/2"
            handleClick={() => {}}
          />
        </div>
        <div className="navbar-icon">
          <MyButton text="Login" path="/login" handleClick={() => {}} />
          <MyButton
            text="log out"
            path="/"
            handleClick={() => {
              this.props.userLogOut(false);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.authReducer.userLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogOut: data => dispatch(actionCreators.userLoggedIn(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
