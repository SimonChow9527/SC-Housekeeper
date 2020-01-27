import React from "react";
import MyButton from "./utility/MyButton.js";
import { Link } from "react-router-dom";
import "../styles/NavStyle.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <span>SCPantryGuru</span>
        </Link>
      </div>
      <div className="navbar-icon">
        <MyButton text="Login" path="/login" handleClick={() => {}} />
        <MyButton text="testItem" path="/itemdetail" handleClick={() => {}} />
      </div>
    </div>
  );
};

export default Navbar;
