import React, { Component } from "react";
import "../styles/ItemListStyle.scss";
import ItemCard from "../component/ItemCard.js";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import { Category } from "../component/Constants.js";
import MyButton from "../component/utility/MyButton.js";
import { toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";
import * as actionCreators from "../actions/actionCreators";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.itemList,
      searchString: "",
      showCategory: "",
      sortBy: "",
    };
    /* this.sortItems = this.sortItems.bind(this);
    this.filterItems = this.filterItems.bind(this);
    this.sorting = this.sorting.bind(this);*/
    console.log(this.props);
  }
  /*
  filterItems() {
    let value = this.state.showCategory;
    if (value === "Category: All") {
      let values = this.props.items;
      this.setState({ items: values });
    } else {
      let values = this.props.items.filter((i) => {
        return i.Category.toLowerCase().indexOf(value.toLowerCase()) >= 0;
      });
      this.setState({ items: values });
    }
  }
  sortItems() {
    let value = this.state.sortBy;

    if (value === "Sort by: ") {
      let items = this.state.items;
      this.setState({ items: items });
    } else if (value === "by Used high to low") {
      let items = this.state.items.sort((a, b) => this.sorting(a, b, "Usage"));
      this.setState({ items: items });
    } else if (value === "by Used low to high") {
      let items = this.state.items
        .sort((a, b) => this.sorting(a, b, "Usage"))
        .reverse();
      this.setState({ items: items });
    } else if (value === "by ExpireDate far to close") {
      let items = this.state.items.sort((a, b) =>
        this.sorting(a, b, "ExpireDate")
      );
      this.setState({ items: items });
    } else if (value === "by ExpireDate close to far") {
      let items = this.state.items
        .sort((a, b) => this.sorting(a, b, "ExpireDate"))
        .reverse();
      this.setState({ items: items });
    }
  }

  sorting(a, b, sortkey) {
    if (sortkey === "ExpireDate") {
      if (!a[sortkey] && b[sortkey]) return -1;
      if (a[sortkey] && !b[sortkey]) return 1;
      if (!a[sortkey] && !b[sortkey]) return 0;
      return new Date(b[sortkey]) - new Date(a[sortkey]);
    }

    if (a[sortkey] <= b[sortkey]) {
      return 1;
    }
    if (a[sortkey] > b[sortkey]) {
      return -1;
    }
    return 0;
  }*/

  render() {
    let listItem = this.state.items
      /* .filter((i) => {
        return (
          this.state.searchString === " " ||
          (i.Name !== null &&
            i.Name.toLowerCase().indexOf(
              this.state.searchString.toLowerCase()
            ) >= 0) ||
          (i.Brand !== null &&
            i.Brand.toLowerCase().indexOf(
              this.state.searchString.toLowerCase()
            ) >= 0) ||
          (i.Flavor !== null &&
            i.Flavor.toLowerCase().indexOf(
              this.state.searchString.toLowerCase()
            ) >= 0) ||
          (i.Cate !== null &&
            i.Category.toLowerCase().indexOf(
              this.state.searchString.toLowerCase()
            ) >= 0)
        );
      })*/
      .map((i) => (
        <li key={i.itemID} onClick={() => {}}>
          <ItemCard item={i} />
        </li>
      ));
    console.log(listItem.length);
    return (
      <div className="item-list-wrapper">
        <ol className="item-list">{listItem}</ol>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.itemReducer.items,
    isLoading: state.itemReducer.isLoading,
    error: state.itemReducer.error,
    userAuthenticated: state.authReducer.userAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: (data) => dispatch(actionCreators.loadItems(data)),
    resetItems: (data) => dispatch(actionCreators.resetItems(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
