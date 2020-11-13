import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faMehRollingEyes } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../styles/NavStyle.scss";
import "../styles/UserPanelStyle.scss";
import CheckMyPantry from "./CheckMyPantry";
import Statistics from "./Statistics";
import PantryAlert from "./PantryAlert";
import ShoppingList from "./ShoppingList";
import SendBills from "./SendBills";
import UserSettings from "./UserSettings";

class UserPanel extends Component {
  render() {
    return (
      <div className="user-panel">
        <div className="sidebar">
          <nav className="nav flex-column">
            <div className="nav-link">
              <Link to={this.props.match.url + "/checkmypantry"}>
                <button>
                  <FontAwesomeIcon icon={faListAlt} size="3x" />
                  <span>Check my pantry</span>
                </button>
              </Link>
            </div>

            <div className="nav-link">
              <Link to={this.props.match.url + "/stats"}>
                <button>
                  <FontAwesomeIcon icon={faChartBar} size="3x" />
                  <span>Statistics</span>
                </button>
              </Link>
            </div>

            <div className="nav-link">
              <Link to={this.props.match.url + "/pantryalert"}>
                <button>
                  <FontAwesomeIcon icon={faBell} size="3x" />
                  <span>Pantry Alert</span>
                </button>
              </Link>
            </div>

            <div className="nav-link">
              <Link to={this.props.match.url + "/shoppinglist"}>
                <button>
                  <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                  <span>Shopping List</span>
                </button>
              </Link>
            </div>

            <div className="nav-link">
              <Link to={this.props.match.url + "/sendbills"}>
                <button>
                  <FontAwesomeIcon icon={faMehRollingEyes} size="3x" />
                  <span>Send bills</span>
                </button>
              </Link>
            </div>

            <div className="nav-link">
              <Link to={this.props.match.url + "/settings"}>
                <button>
                  <FontAwesomeIcon icon={faCogs} size="3x" />
                  <span>Settings</span>
                </button>
              </Link>
            </div>
          </nav>
        </div>
        <Switch>
          <Route
            path={this.props.match.url + "/checkmypantry"}
            component={CheckMyPantry}
          />
          <Route
            path={this.props.match.url + "/stats"}
            component={Statistics}
          />
          <Route
            path={this.props.match.url + "/pantryalert"}
            component={PantryAlert}
          />

          <Route
            path={this.props.match.url + "/shoppinglist"}
            component={ShoppingList}
          />
          <Route
            path={this.props.match.url + "/sendbills"}
            component={SendBills}
          />
          <Route
            path={this.props.match.url + "/settings"}
            component={UserSettings}
          />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
