import React, { Component } from "react";
import "../styles/HomepageStyle.scss";
import { connect } from "react-redux";

class HomePage extends Component {
  render() {
    const contactLink = (
      <a href="https://simonchow.dev" target="_blank" rel="noopener noreferrer">
        me
      </a>
    );
    return (
      <div className="homepage-wrapper">
        <div className="desc">
          <h1> Pantry Guru</h1>
          <br />
          <h2>A personal pantry management platform</h2>
          <br />
          <h6>
            Contact {contactLink} for a real account <br />
            or <br />
            login as a guest and take a tour
          </h6>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    userAuthenticated: state.authReducer.userAuthenticated,
    items: state.itemReducer.items,
    cognitoUser: state.authReducer.cognitoUser,
  };
};

export default connect(MapStateToProps, null)(HomePage);
