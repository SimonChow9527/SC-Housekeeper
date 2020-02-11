import React, { Component } from "react";
import "../styles/HomepageStyle.scss";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import { Category } from "../component/Constants.js";
import MyButton from "../component/utility/MyButton.js";

class HomePage extends Component {
  componentDidMount() {
    /* try {
      let myInit = {
        body: {
          userEmail: this.props.cognitoUser.attributes.email,
          Items: this.props.items
        }
      };
      API.put("userProfileApi", "/userprofile", myInit).then(res => {
        console.log(res);
      });
      /*API.get("userProfileApi", "/userprofile/tryit", {}).then(res => {
        console.log(res)
      });
    } catch (error) {
      console.log(error);
    }*/
  }
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
