import React, { useState } from "react";
import "../styles/RegisterStyle.scss";
import MyButton from "./utility/MyButton.js";
import Switch from "react-switch";

const Register = () => {
  const [formType, setFormType] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
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
          }}
        />
      </div>
    </div>
  );
};

export default Register;
