import React, { Component } from "react";
import "../styles/SearchbarStyle.scss";
import { connect } from "react-redux";

class Searchbar extends Component {
  render() {
    return (
      <div className="searchbar-wrapper">
        <div className="desc">Hey, your personal pantry guru is here</div>
        <br />
        {this.props.userLoggedIn ? (
          <div className="searchbar">here will have a search bar</div>
        ) : (
          <div className="searchbar">please login</div>
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

export default connect(MapStateToProps, null)(Searchbar);
