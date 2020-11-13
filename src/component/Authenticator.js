import React, { Component } from "react";
import "../styles/AuthenticatorStyle.scss";
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
      isRegister: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);

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
    this.handleSignin();
  }

  async handleSignin() {
    let username = this.state.userEmail;
    let password = this.state.userPassword;
    try {
      await Auth.signIn(username, password).then((data) =>
        this.setState({
          CognitoUser: data,
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
      await Auth.signIn(username, password).then((data) =>
        this.setState({
          CognitoUser: data,
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
    return (
      <div className="register-wrapper">
        <div className="forms">
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            id="Email"
            className="my-input"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              this.setState({
                userEmail: e.target.value,
              })
            }
          />
          <label htmlFor="Password">Password</label>

          <input
            type="password"
            id="Password"
            className="my-input"
            placeholder="Password"
            onChange={(e) =>
              this.setState({
                userPassword: e.target.value,
              })
            }
          />

          <br />
          <button
            id="submitBtn"
            className="my-button"
            onClick={() => {
              this.handleSubmit();
            }}
          >
            Log in
          </button>
          <button
            className="my-button"
            onClick={() => {
              this.handleAndySignin();
            }}
          >
            I'm a guest
          </button>
          <br />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userAuthenticator: (data) =>
      dispatch(actionCreators.userAuthenticator(data)),
    setUser: (data) => dispatch(actionCreators.setUser(data)),
  };
};

export default connect(null, mapDispatchToProps)(Authenticator);
