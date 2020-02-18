import React, { Component } from "react";
import "../styles/HomepageStyle.scss";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faChartArea } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class HomePage extends Component {
  render() {
    return (
      <div className="homepage-wrapper">
        {this.props.userAuthenticated ? (
          <div className="feature-table">
            <span className="feature-desc">Here you can </span>
            <div className="feature-table-features">
              <Link to="/itemlist" className="feature-link">
                <div className="feature-element">
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    size="6x"
                    className="feature-element-icon"
                  />
                  <span>Manage Pantry</span>
                </div>
              </Link>
              <Link to="" className="feature-link">
                <div className="feature-element">
                  <FontAwesomeIcon
                    icon={faBell}
                    size="6x"
                    className="feature-element-icon"
                  />
                  <span>Set Usage Alert</span>
                  <span>under construction</span>
                </div>
              </Link>

              <Link to="" className="feature-link">
                <div className="feature-element">
                  <FontAwesomeIcon
                    icon={faChartArea}
                    size="6x"
                    className="feature-element-icon"
                  />
                  <span>Usage Analytics</span>
                  <span>under construction</span>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="desc">
            Hey, your personal pantry guru is here <br />
            please sign in
            <br />
            (Or sign in as our dummy user Andy to take a tour )
          </div>
        )}
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    userAuthenticated: state.authReducer.userAuthenticated,
    items: state.itemReducer.items,
    cognitoUser: state.authReducer.cognitoUser
  };
};

export default connect(MapStateToProps, null)(HomePage);
