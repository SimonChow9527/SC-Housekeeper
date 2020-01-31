import React from "react";
import { Link } from "react-router-dom";
import "../../styles/UtilityStyle.scss";
import PropTypes from "prop-types";

const MyButton = props => {
  return props.path != null ? (
    <Link to={props.path}>
      <button
        id={props.id}
        className={"my-button " + props.extraclassname}
        onClick={props.handleClick}
      >
        {props.text}
      </button>
    </Link>
  ) : (
    <button
      id={props.id}
      className={"my-button " + props.extraclassname}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
};

MyButton.propTypes = {
  //id
  id: PropTypes.string,
  //route path is optional
  path: PropTypes.string,
  //text on the button
  text: PropTypes.string,
  onClick: PropTypes.func,
  extraclassname: PropTypes.string
};
export default MyButton;
