import React, { Component } from "react";
import "../styles/HomepageStyle.scss";
import { connect } from "react-redux";
import MyButton from "../component/utility/MyButton.js";

class HomePage extends Component {
  render() {
    return (
      <div className="homepage-wrapper">
        {this.props.userAuthenticated ? (
          <div className="feature-table">
            <MyButton text="to item list" path="/itemlist" />
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
