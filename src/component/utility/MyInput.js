import React from "react";
import PropTypes from "prop-types";

const MyInput = props => {
  return (
    <div className="input-wrapper">
      <label className="input-text" htmlFor={props.inputID}>
        {props.name + " : "}
      </label>
      <input
        type="text"
        id={props.inputID}
        className="my-input input-input"
        placeholder={props.placeholder}
        onChange={e => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

MyInput.propTypes = {
  name: PropTypes.string,
  inputID: PropTypes.string,
  onChange: PropTypes.func
};
export default MyInput;
