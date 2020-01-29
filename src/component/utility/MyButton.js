import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UtilityStyle.scss";
import PropTypes from "prop-types";

const MyButton = props => {
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

MyButton.propTypes = {
  //route path is optional
  path: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func
};
export default MyButton;
