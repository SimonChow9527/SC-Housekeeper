import React, { useState } from "react";
import "../styles/RegisterStyle.scss";
import MyButton from "./utility/MyButton.js";
import classNames from "classnames";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  let registerButtonClass = classNames({
    btn: true,
    "btn-secondary": true,
    "register-btn": true,
    "register-btn-isSelected": isRegister
  });
  let signinButtonClass = classNames({
    btn: true,
    "btn-secondary": true,
    "register-btn": true,
    "register-btn-isSelected": !isRegister
  });

  let usernameInputClass = classNames({
    "my-input": true,
    hide: !isRegister
  });
  let usernameLabelClass = classNames({
    hide: !isRegister
  });

  let emailSmallClass = classNames({
    "form-text": true,
    "text-muted": true,
    hide: !isRegister
  });

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
            className={registerButtonClass}
            onClick={() => setIsRegister(!isRegister)}
          >
            Register
          </button>
          <button
            type="button"
            className={signinButtonClass}
            onClick={() => setIsRegister(!isRegister)}
          >
            Sign in
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
          onChange={e => setUserEmail(e.target.value)}
        />
        <small id="emailHelp" className={emailSmallClass}>
          please enter a valid email.
        </small>

        <label htmlFor="username" className={usernameLabelClass}>
          User Name
        </label>
        <input
          type="text"
          id="username"
          className={usernameInputClass}
          placeholder="Enter a user name that you like"
          onChange={e => setUserName(e.target.value)}
        />
        <br />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          className="my-input"
          placeholder="Password"
          value={userPassword}
          onChange={e => setUserPassword(e.target.value)}
        />
        <br />
        <MyButton
          text="Submit"
          handleClick={() => {
            console.log({ userEmail });
            console.log({ userPassword });
            console.log({ isRegister });
          }}
        />
      </div>
    </div>
  );
};

export default Register;
