import React from "react";
import "../styles/PageNotFoundStyle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlushed } from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="pnf-container">
        <div className="sub-container">
          <FontAwesomeIcon icon={faFlushed} size="8x" />
        </div>
        <div className="sub-container">
          <h1>Oops, dead end</h1>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
