import React, { Component } from "react";
import "../styles/ItemListStyle.scss";
import ItemCard from "../component/ItemCard.js";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import { Category } from "../component/Constants.js";
import MyButton from "../component/utility/MyButton.js";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      searchString: "",
      showCategory: "",
      sortBy: ""
    };
    this.sortItems = this.sortItems.bind(this);
    this.filterItems = this.filterItems.bind(this);
    this.sorting = this.sorting.bind(this);
  }
  filterItems() {
    let value = this.state.showCategory;
    if (value === "Category: All") {
      let values = this.props.items;
      this.setState({ items: values });
    } else {
      let values = this.props.items.filter(i => {
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
    } else if (value === "by Usage") {
      let items = this.state.items.sort((a, b) => this.sorting(a, b, "Usage"));
      this.setState({ items: items });
    } else if (value === "by ExpireDate") {
      let items = this.state.items.sort((a, b) =>
        this.sorting(a, b, "ExpireDate")
      );
      this.setState({ items: items });
    }
  }

  sorting(a, b, sortkey) {
    // sorting by descending
    if (a[sortkey] <= b[sortkey]) {
      return 1;
    }
    if (a[sortkey] > b[sortkey]) {
      return -1;
    }
    return 0;
  }

  render() {
    let listItem = this.state.items
      .filter(i => {
        return (
          this.state.searchString === " " ||
          i.Name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) >=
            0 ||
          i.Brand.toLowerCase().indexOf(
            this.state.searchString.toLowerCase()
          ) >= 0 ||
          i.Flavor.toLowerCase().indexOf(
            this.state.searchString.toLowerCase()
          ) >= 0 ||
          i.Category.toLowerCase().indexOf(
            this.state.searchString.toLowerCase()
          ) >= 0
        );
      })
      .map(i => (
        <li
          key={i.ID}
          onClick={e => {
            this.props.history.push("/itemdetail/" + i.ID);
          }}
        >
          {<ItemCard item={i} />}
        </li>
      ));
    let categoryoptions = [
      "Category: All",
      Category.Kitchen,
      Category.Medicine,
      Category.Bathroom,
      Category.General
    ];
    let sortoptions = ["Sort by: ", "by Usage", "by ExpireDate"];
    let defaultCategory =
      this.state.showCategory === ""
        ? "Category: All"
        : this.state.showCategory;
    let defaultSort =
      this.state.sortBy === "" ? "Sort by: " : this.state.sortBy;

    return (
      <div className="item-list-wrapper">
        <div className="item-searchbar">
          <div className="item-searchbar-input">
            <input
              placeholder="Type in name, brand, flavor or category to search"
              className="my-input input-input "
              onChange={e => {
                this.setState({
                  searchString: e.target.value
                });
              }}
            />
          </div>
          <div className="item-searchbar-filter">
            <Dropdown
              options={sortoptions}
              onChange={e => {
                this.setState(
                  {
                    sortBy: e.value
                  },
                  () => {
                    this.sortItems();
                  }
                );
              }}
              value={defaultSort}
            />
            <Dropdown
              options={categoryoptions}
              onChange={e => {
                this.setState(
                  {
                    showCategory: e.value
                  },
                  () => {
                    this.filterItems();
                  }
                );
              }}
              value={defaultCategory}
            />
          </div>
          <div className="item-searchbar-button">
            <MyButton
              text="Add item"
              onClick={() => {
                console.log("create item click");
              }}
              extraclassname="btn-custom-green"
            />
          </div>
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
