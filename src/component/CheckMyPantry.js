import React, { Component } from "react";
import "../styles/PanelSubComponentStyles.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ItemCreator from "./ItemCreator";
import ItemList from "./ItemList";

class CheckMyPantry extends Component {
  render() {
    let fakeItem = [
      {
        itemID: "12453",
        itemName: "test item",
        itemBrand: "test brand",
        itemPrice: ["5", "AUD"],
        itemExpireDate: "2020-11-15",
        percentageUsed: "80",
        status: "active",
        category: "Kitchen",
        note: "here is note part",
        customAlert: null,
      },
      {
        itemID: "123",
        itemName: "sand box",
        itemBrand: "woolworth",
        itemPrice: ["3.5", "AUD"],
        itemExpireDate: "",
        percentageUsed: "80",
        status: "active",
        category: "Kitchen",
        note: "here is note part",
        customAlert: null,
      },
      {
        itemID: "12553",
        itemName: "white paint",
        itemBrand: "bunnings",
        itemPrice: ["5.2", "AUD"],
        itemExpireDate: "2021-06-30",
        percentageUsed: "30",
        status: "active",
        category: "Kitchen",
        note:
          "fkabwkf abdukawbkd  bawdkubdak  bdakwbdk abd bkawbdkab d dabukwdb  dbaukwdbka bduawb dkbakw bdkauwb kabd buadkbw k",
        customAlert: null,
      },
    ];
    return (
      <div className="check-pantry">
        <Link to={this.props.match.url + "/createitem"}>
          <button>create item</button>
        </Link>

        <Switch>
          <Route
            path={this.props.match.url + "/createitem"}
            component={ItemCreator}
          />
          <Route
            path={this.props.match.url}
            render={(props) => <ItemList {...props} itemList={fakeItem} />}
          />
        </Switch>
      </div>
    );
  }
}

export default CheckMyPantry;
