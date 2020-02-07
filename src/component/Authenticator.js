import React, { Component } from "react";
import "../styles/RegisterStyle.scss";
import MyButton from "./utility/MyButton.js";
import * as actionCreators from "../actions/actionCreators";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

class Authenticator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      userRepeatPassword: "",
      CognitoUsername: "",
      isRegister: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleSubmit() {
    if (this.state.isRegister) this.handleSignUp();
    else this.handleSignin();
  }

  async handleSignUp() {
    let username = this.state.userEmail;
    let password = this.state.userPassword;
    let email = this.state.userEmail;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          name: username
        }
      });
    } catch (err) {
      toast.error(err.message);
      return;
    }

    toast.success("Welcome! you have successfully registered a new account");
    toast.success(
      "And don't forget to check your email to confirm your email address"
    );
  }

  async handleSignin() {
    let username = this.state.userEmail;
    let password = this.state.userPassword;
    try {
      await Auth.signIn(username, password).then(data =>
        this.setState({
          CognitoUser: data
        })
      );
    } catch (err) {
      toast.error(err.message);
      return;
    }
    this.props.userAuthenticator(true);
    this.props.setUser(this.state.CognitoUser);
  }

  render() {
    let userRepeatPassword = this.state.isRegister ? (
      <input
        type="password"
        id="RepeatPassword"
        className="my-input"
        placeholder="Please confirm your Password"
        onChange={e =>
          this.setState(
            {
              userRepeatPassword: e.target.value
            },
            () => {
              if (this.state.isRegister) {
                // confirm password not match
                if (this.state.userPassword !== this.state.userRepeatPassword) {
                  document.getElementById("submitBtn").disabled = true;
                  document
                    .getElementById("submitBtn")
                    .classList.add("ban-hover");
                  document
                    .getElementById("repeatPasswordtip")
                    .classList.remove("hide");
                } else {
                  document
                    .getElementById("repeatPasswordtip")
                    .classList.add("hide");
                }
                if (this.state.userPassword.length < 6) {
                  //password length not correct
                  document.getElementById("submitBtn").disabled = true;
                  document
                    .getElementById("submitBtn")
                    .classList.add("ban-hover");
                  document
                    .getElementById("repeatPasswordtip2")
                    .classList.remove("hide");
                } else {
                  document
                    .getElementById("repeatPasswordtip2")
                    .classList.add("hide");
                }
                if (
                  this.state.userPassword === this.state.userRepeatPassword &&
                  this.state.userPassword.length >= 6
                ) {
                  document.getElementById("submitBtn").disabled = false;
                  document
                    .getElementById("submitBtn")
                    .classList.remove("ban-hover");
                }
              }
            }
          )
        }
      />
    ) : (
      ""
    );
    let repeatPasswordLabel = this.state.isRegister ? (
      <label htmlFor="RepeatPassword">Confirm Password</label>
    ) : (
      ""
    );
    let userRepeatPasswordTip = (
      <small id="repeatPasswordtip" className="repeatPasswordtip hide">
        Password doesn't match <br />
      </small>
    );
    let userRepeatPasswordTip2 = (
      <small id="repeatPasswordtip2" className="repeatPasswordtip hide">
        Password length not correct (minimum 6)
      </small>
    );

    let passwordlabel = this.state.isRegister ? (
      <label htmlFor="Password">Password (min length 6) </label>
    ) : (
      <label htmlFor="Password">Password</label>
    );

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
                this.setState({ isRegister: false });
                document
                  .getElementById("register-btn")
                  .classList.remove("register-btn-isSelected");
                document
                  .getElementById("signin-btn")
                  .classList.add("register-btn-isSelected");
                document
                  .getElementById("repeatPasswordtip")
                  .classList.add("hide");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              id="register-btn"
              className="btn btn-secondary register-btn "
              onClick={() => {
                this.setState({ isRegister: true });
                document
                  .getElementById("register-btn")
                  .classList.add("register-btn-isSelected");
                document
                  .getElementById("signin-btn")
                  .classList.remove("register-btn-isSelected");
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("submitBtn").classList.add("ban-hover");
                document
                  .getElementById("repeatPasswordtip")
                  .classList.remove("hide");
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
          {passwordlabel}

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
          {repeatPasswordLabel}
          {userRepeatPassword}
          {userRepeatPasswordTip}
          {userRepeatPasswordTip2}

          <br />
          <br />
          <MyButton
            text="Submit"
            id="submitBtn"
            handleClick={() => {
              this.handleSubmit();
            }}
          />
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
    userAuthenticator: data => dispatch(actionCreators.userAuthenticator(data)),
    setUser: data => dispatch(actionCreators.setUser(data))
  };
};

export default connect(null, mapDispatchToProps)(Authenticator);
