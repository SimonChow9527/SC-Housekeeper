import React, { Component } from "react";
import "../styles/HomepageStyle.scss";
import { connect } from "react-redux";
import ItemList from "./ItemList.js";
import { API } from "aws-amplify";
import { Category } from "../component/Constants.js";

class HomePage extends Component {
  componentDidMount() {
    try {
      let myInit = {
        header: {
          ID: "8",
          UserID: "userid"
        }
      };
      API.del("items", "/items/object/8/userid", myInit).then(res => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="homepage-wrapper">
        {this.props.userLoggedIn ? (
          <ItemList />
        ) : (
          <div className="desc">
            Hey, your personal pantry guru is here <br />
            please login{" "}
          </div>
        )}
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    userLoggedIn: state.authReducer.userLoggedIn
  };
};

export default connect(MapStateToProps, null)(HomePage);
