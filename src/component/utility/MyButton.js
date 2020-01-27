import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UtilityStyle.scss";

const Mybutton = props => {
  return props.path != null ? (
    <Link to={props.path}>
      <button className="my-button" onClick={props.handleClick}>
        {props.text}
      </button>
    </Link>
  ) : (
    <button className="my-button" onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

export default Mybutton;
