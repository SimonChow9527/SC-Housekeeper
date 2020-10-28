import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faMehRollingEyes } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "../styles/NavStyle.scss";
import "../styles/UserPanelStyle.scss";

class UserPanel extends Component {
  render() {
    return (
      <div className="feature-table">
        <div className="sidebar">
          <nav className="nav flex-column">
            <div className="nav-link">
              <button>
                <FontAwesomeIcon icon={faListAlt} size="3x" />
                <span>Check my pantry</span>
              </button>
            </div>

            <div className="nav-link">
              <button>
                <FontAwesomeIcon icon={faChartBar} size="3x" />
                <span>Statistics</span>
              </button>
            </div>

            <div className="nav-link">
              <button>
                <FontAwesomeIcon icon={faBell} size="3x" />
                <span>Pantry Alert</span>
              </button>
            </div>

            <div className="nav-link">
              <button>
                <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                <span>Shopping List</span>
              </button>
            </div>

            <div className="nav-link">
              <button>
                <FontAwesomeIcon icon={faMehRollingEyes} size="3x" />
                <span>Send bills</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default UserPanel;
