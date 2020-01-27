import React from "react";
import MyButton from "./utility/MyButton.js";
import "../styles/NavStyle.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <MyButton
        text="Login"
        path="/login"
        handleClick={() => {
          console.log("no");
        }}
      />
    </div>
  );
};

export default Navbar;
