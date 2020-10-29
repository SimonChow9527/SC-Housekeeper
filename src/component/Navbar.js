import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/NavStyle.scss";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
import { Auth } from "aws-amplify";
import Dropdown from "react-dropdown";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faMehRollingEyes } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToChangePassword: false,
    };
    this.handleLogoutDropdown = this.handleLogoutDropdown.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }

  handleLogoutDropdown(value) {
    switch (value.value) {
      case "Log out": {
        this.userLogout();
        return;
      }
      case "Change password": {
        this.props.history.push("/changepassword");
        return;
      }

      default:
        return;
    }
  }
  userLogout() {
    Auth.signOut().catch((err) => console.log(err));
    this.props.userAuthenticator(false);
    this.props.setUser(null);
    this.props.history.push("/");
  }

  render() {
    let menuOptions = [
      {
        name: "Check my pantry",
        iconName: faListAlt,
      },
      {
        name: "Statistics",
        iconName: faChartBar,
      },
      {
        name: "Pantry Alert",
        iconName: faBell,
      },
      {
        name: "Shopping List",
        iconName: faCheckCircle,
      },
      {
        name: "Send bills",
        iconName: faMehRollingEyes,
      },
      {
        name: "Settings",
        iconName: faCogs,
      },
    ];
    let menuItem = menuOptions.map((item) => (
      <button
        className="dropdown-item"
        id={item.name}
        key={item.name}
        onClick={(e) => {
          console.log(e.target.id);
        }}
      >
        <FontAwesomeIcon icon={item.iconName} size="1x" /> {item.name}
      </button>
    ));
    return (
      <div className="navBar my-navbar">
        <div className="d-flex mb-3 my-navbar">
          <div className="mr-auto p-2 pc-nav">
            <Link to="/">
              <span>SCPantryGuru</span>
            </Link>
          </div>
          <div className="p-2 mobile-nav">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </Link>
          </div>

          <div className="p-2 mobile-nav">
            <div className="nav-item dropdown">
              <button
                className="btn dropdown-toggle icon-background"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Menu
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {menuItem}
              </div>
            </div>
          </div>

          <div className="p-2 nav-icons pc-nav">
            <Link to="/userpanel">
              <span className="nav-item-custom">User panel</span>
            </Link>
          </div>
          <div className="p-2 nav-icons">
            <Link to="/login">
              <span className="nav-item-custom">login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAuthenticated: state.authReducer.userAuthenticated,
    cognitoUser: state.authReducer.cognitoUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userAuthenticator: (data) =>
      dispatch(actionCreators.userAuthenticator(data)),
    setUser: (data) => dispatch(actionCreators.setUser(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
