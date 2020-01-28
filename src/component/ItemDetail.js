import React, { Component } from "react";
import "../styles/ItemDetailStyle.scss";
import { connect } from "react-redux";

class ItemDetail extends Component {
  render() {
    if (this.props.item == null) {
      this.props.history.push("/");
      return null;
    } else {
      return <div className="item-detail-wrapper">{this.props.item.title}</div>;
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
