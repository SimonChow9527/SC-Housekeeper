import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UtilityStyle.scss";

const Mybutton = props => {
  return (
    <Link to={props.path}>
      <button className="my-button">{props.text}</button>
    </Link>
  );
};

export default Mybutton;
