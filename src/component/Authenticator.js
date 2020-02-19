import React, { Component } from "react";
import "../styles/AuthenticatorStyle.scss";
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
    this.banSubmitShowTip = this.banSubmitShowTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
    this.enableSubmit = this.enableSubmit.bind(this);
    this.signinBehaviour = this.signinBehaviour.bind(this);
    this.registerBehaviour = this.registerBehaviour.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleAndySignin = this.handleAndySignin.bind(this);
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
    this.props.history.push("/");
  }

  async handleAndySignin() {
    let username = "Andy@dummy.com";
    let password = "123456";
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
    this.props.history.push("/");
  }

  //deprecated for now
  async handleGoogleLogin() {
    await Auth.federatedSignIn();
  }

  banSubmitShowTip(SubmitBtnID, tipID) {
    document.getElementById(SubmitBtnID).disabled = true;
    document.getElementById(SubmitBtnID).classList.add("ban-hover");
    document.getElementById(tipID).classList.remove("hide");
  }
  hideTip(tipID) {
    document.getElementById(tipID).classList.add("hide");
  }
  enableSubmit(SubmitBtnID) {
    document.getElementById(SubmitBtnID).disabled = false;
    document.getElementById(SubmitBtnID).classList.remove("ban-hover");
  }
  signinBehaviour() {
    this.setState({ isRegister: false });
    document
      .getElementById("register-btn")
      .classList.remove("register-btn-isSelected");
    document
      .getElementById("signin-btn")
      .classList.add("register-btn-isSelected");
    document.getElementById("repeatPasswordtip").classList.add("hide");
    this.enableSubmit("submitBtn");
  }
  registerBehaviour() {
    this.setState({ isRegister: true });
    document
      .getElementById("register-btn")
      .classList.add("register-btn-isSelected");
    document
      .getElementById("signin-btn")
      .classList.remove("register-btn-isSelected");
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").classList.add("ban-hover");
    document.getElementById("repeatPasswordtip").classList.remove("hide");
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
                // confirm password doesn't match
                if (this.state.userPassword !== this.state.userRepeatPassword) {
                  this.banSubmitShowTip("submitBtn", "repeatPasswordtip");
                } else {
                  this.hideTip("repeatPasswordtip");
                }
                if (this.state.userPassword.length < 6) {
                  //password length not correct
                  this.banSubmitShowTip("submitBtn", "repeatPasswordtip2");
                } else {
                  this.hideTip("repeatPasswordtip2");
                }
                if (
                  this.state.userPassword === this.state.userRepeatPassword &&
                  this.state.userPassword.length >= 6
                ) {
                  this.enableSubmit("submitBtn");
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
                this.signinBehaviour();
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              id="register-btn"
              className="btn btn-secondary register-btn "
              onClick={() => {
                this.registerBehaviour();
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
          <MyButton
            text="Submit"
            id="submitBtn"
            handleClick={() => {
              this.handleSubmit();
            }}
          />
        </div>
        <div className="form-tip">or you can</div>
        <div className="forms-other">
          <br />
          <MyButton
            text="Log in as guest"
            handleClick={() => {
              this.handleAndySignin();
            }}
          />
          <br />
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
