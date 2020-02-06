import React, { Component } from "react";
import "../styles/RegisterStyle.scss";
import MyButton from "./utility/MyButton.js";
import * as actionCreators from "../actions/actionCreators";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";

class Authenticator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPassword: "",
      userRepeatPassword: "",
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
    await Auth.signUp({
      username,
      password,
      attributes: {
        email: email,
        name: username
      }
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  handleSignin() {}

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
              if (this.state.userPassword !== this.state.userRepeatPassword) {
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("submitBtn").classList.add("ban-hover");
                document
                  .getElementById("repeatPasswordtip")
                  .classList.remove("hide");
              } else {
                document.getElementById("submitBtn").disabled = false;
                document
                  .getElementById("submitBtn")
                  .classList.remove("ban-hover");
                document
                  .getElementById("repeatPasswordtip")
                  .classList.add("hide");
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
        Password doesn't match
      </small>
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
          {repeatPasswordLabel}
          {userRepeatPassword}
          {userRepeatPasswordTip}

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
    userLoggedIn: data => dispatch(actionCreators.userLoggedIn(data))
  };
};

export default connect(null, mapDispatchToProps)(Authenticator);
