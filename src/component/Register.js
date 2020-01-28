import React, { Component } from "react";
import "../styles/RegisterStyle.scss";
import MyButton from "./utility/MyButton.js";
import * as actionCreators from "../actions/actionCreators";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userName: "",
      userPassword: "",
      isRegister: false
    };

    this.cssClassNameHelper = this.cssClassNameHelper.bind(this);
    this.changeRegisterForm = this.changeRegisterForm.bind(this);
  }

  changeRegisterForm() {
    //change button color
    let registerbtn = document.getElementById("register-btn");
    let signinbtn = document.getElementById("signin-btn");
    this.cssClassNameHelper(registerbtn, "register-btn-isSelected");
    this.cssClassNameHelper(signinbtn, "register-btn-isSelected");
    // don't require username for login
    let usernameinput = document.getElementById("username");
    this.cssClassNameHelper(usernameinput, "hide");
    let usernamelabel = document.getElementById("usernamelable");
    this.cssClassNameHelper(usernamelabel, "hide");
    // no need to show email prompt when login
    let emailhelp = document.getElementById("emailHelp");
    this.cssClassNameHelper(emailhelp, "hide");
  }

  cssClassNameHelper(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }

  render() {
    return (
      <div className="register-wrapper">
        <div className="forms">
          <div
            className="btn-group"
            role="group"
            aria-label="register or sign in"
          >
            <button
              type="button"
              id="signin-btn"
              className="btn btn-secondary register-btn register-btn-isSelected"
              onClick={() => {
                this.setState({ isRegister: true });
                this.changeRegisterForm();
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              id="register-btn"
              className="btn btn-secondary register-btn "
              onClick={() => {
                this.setState({ isRegister: false });
                this.changeRegisterForm();
              }}
            >
              Register
            </button>
          </div>
          <br />
          <br />
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            id="Email"
            className="my-input"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={e =>
              this.setState({
                userEmail: e.target.value
              })
            }
          />
          <small id="emailHelp" className="hide">
            please enter a valid email.
          </small>

          <label id="usernamelable" htmlFor="username" className="hide">
            User Name
          </label>
          <input
            type="text"
            id="username"
            className="my-input hide"
            placeholder="Enter a user name that you like"
            onChange={e =>
              this.setState({
                userName: e.target.value
              })
            }
          />
          <br />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            className="my-input"
            placeholder="Password"
            onChange={e =>
              this.setState({
                userPassword: e.target.value
              })
            }
          />
          <br />
          <MyButton text="Submit" handleClick={() => {}} />
          <MyButton
            text="Log in as guest"
            handleClick={() => {
              this.props.userLoggedIn(true);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: data => dispatch(actionCreators.userLoggedIn(data))
  };
};

export default connect(null, mapDispatchToProps)(Register);
