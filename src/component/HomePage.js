import React, { Component } from "react";
import "../styles/HomepageStyle.scss";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import { Category } from "../component/Constants.js";
import MyButton from "../component/utility/MyButton.js";

class HomePage extends Component {
  componentDidMount() {
    try {
      let myInit = {
        header: {
          ID: "8",
          UserID: "userid"
        }
      };
      /*API.del("items", "/items/object/8/userid", myInit).then(res => {
        console.log(res);
      });*/
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="homepage-wrapper">
        {this.props.userAuthenticated ? (
          <MyButton text="to item list" path="/itemlist" />
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
    userAuthenticated: state.authReducer.userAuthenticated
  };
};

export default connect(MapStateToProps, null)(HomePage);
