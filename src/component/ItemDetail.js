import React, { Component } from "react";
import "../styles/ItemDetailStyle.scss";
import { connect } from "react-redux";
import MySlider from "../component/utility/MySlider.js";
import MyInput from "../component/utility/MyInput.js";

class ItemDetail extends Component {
  render() {
    if (this.props.item == null) {
      this.props.history.push("/");
      return null;
    } else {
      return (
        <div className="item-detail-wrapper">
          <MySlider name="Usage" defaultValue="20" onChange={value => {}} />
          <MyInput
            name="itemName"
            id="itemName"
            placeholder=" enter name"
            onChange={e => {
              console.log(e);
            }}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = parseInt(ownProps.match.params.id);

  return {
    item: state.itemReducer.items.find(item => item.id === id)
  };
};

export default connect(mapStateToProps)(ItemDetail);
