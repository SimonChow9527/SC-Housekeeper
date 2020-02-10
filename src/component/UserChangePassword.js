import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
import { Auth } from "aws-amplify";
import "../styles/AuthenticatorStyle.scss";
import MyButton from "./utility/MyButton.js";
import { toast } from "react-toastify";

class UserChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.banSubmitShowTip = this.banSubmitShowTip.bind(this);
    this.hideTip = this.hideTip.bind(this);
    this.enableSubmit = this.enableSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById("changePasswordSubmitBtn").disabled = true;
    document
      .getElementById("changePasswordSubmitBtn")
      .classList.add("ban-hover");
  }

  async handleSubmit() {
    try {
      await Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(
            user,
            this.state.oldPassword,
            this.state.newPassword
          );
        })
        .then(data => toast.success(data));
    } catch (err) {
      if (err.message.indexOf("previousPassword"))
        toast.error("Old password not correct");
      else {
        toast.error(err.message);
      }
    }
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

  render() {
    let userRepeatPasswordTip = (
      <small id="changepw-repeatPasswordtip" className="repeatPasswordtip hide">
        Password doesn't match
        <br />
      </small>
    );
    let userRepeatPasswordTip2 = (
      <small
        id="changepw-repeatPasswordtip2"
        className="repeatPasswordtip hide"
      >
        Password length not correct (minimum 6)
      </small>
    );
    let userRepeatPasswordTip3 = (
      <small id="changepw-repeatPasswordtip3" className="repeatPasswordtip">
        Old password can't be null
      </small>
    );
    return (
      <div className="change-password">
        <label>Change your password</label>
        <br />
        <label htmlFor="oldPassword">Old password</label>
        <input
          type="password"
          id="oldPassword"
          className="my-input"
          placeholder="Password"
          onChange={e =>
            this.setState(
              {
                oldPassword: e.target.value
              },
              () => {
                this.hideTip("changepw-repeatPasswordtip3");
              }
            )
          }
        />
        {userRepeatPasswordTip3}
        <br />
        <label htmlFor="newPassword">New password</label>
        <input
          type="password"
          id="newPassword"
          className="my-input"
          placeholder="New password (min length 6)"
          onChange={e =>
            this.setState({
              newPassword: e.target.value
            })
          }
        />
        <br />
        <label htmlFor="confirmNewPassword">Confirm new password</label>

        <input
          type="password"
          id="confirmNewPassword"
          className="my-input"
          placeholder="Confirm your new password"
          onChange={e =>
            this.setState(
              {
                confirmNewPassword: e.target.value
              },
              () => {
                if (this.state.confirmNewPassword !== this.state.newPassword) {
                  this.banSubmitShowTip(
                    "changePasswordSubmitBtn",
                    "changepw-repeatPasswordtip"
                  );
                } else {
                  this.hideTip("changepw-repeatPasswordtip");
                }
                if (this.state.newPassword.length < 6) {
                  this.banSubmitShowTip(
                    "changePasswordSubmitBtn",
                    "changepw-repeatPasswordtip2"
                  );
                } else {
                  this.hideTip("changepw-repeatPasswordtip2");
                }
                if (
                  this.state.newPassword.length >= 6 &&
                  this.state.newPassword === this.state.confirmNewPassword
                ) {
                  this.enableSubmit("changePasswordSubmitBtn");
                  this.hideTip("changepw-repeatPasswordtip");
                  this.hideTip("changepw-repeatPasswordtip2");
                }
              }
            )
          }
        />
        {userRepeatPasswordTip}
        {userRepeatPasswordTip2}
        <br />
        <MyButton
          text="Submit"
          id="changePasswordSubmitBtn"
          handleClick={() => {
            this.handleSubmit();
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserChangePassword);
