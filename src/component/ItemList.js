import React, { Component } from "react";
import "../styles/ItemListStyle.scss";
import ItemCard from "../component/ItemCard.js";
import MyInput from "./utility/MyInput.js";
import { connect } from "react-redux";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
  }
  render() {
    let listItem = this.props.items.map(i => (
      <li
        key={i.id}
        onClick={e => {
          this.props.history.push("/itemdetail/" + i.id);
        }}
      >
        {<ItemCard item={i} />}
      </li>
    ));
    return (
      <div className="item-list-wrapper">
        <div className="item-searchbar">
          <input
            placeholder="search my pantry"
            className="my-input input-input"
            onChange={e => {
              this.setState(
                {
                  searchString: e.target.value
                },
                () => {
                  console.log(this.state.searchString);
                }
              );
            }}
          />
        </div>
        <ol className="item-list">{listItem}</ol>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.itemReducer.items
  };
};

export default connect(mapStateToProps)(ItemList);
