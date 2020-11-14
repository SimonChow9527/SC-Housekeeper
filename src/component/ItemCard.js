import React, { Component } from "react";
import "../styles/ItemListStyle.scss";
import MySlider from "../component/utility/MySlider.js";

class ItemCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
    };

    this.calculateDays = this.calculateDays.bind(this);
  }

  calculateDays(expiredate) {
    let currentDate = new Date();
    let expireDate = new Date(expiredate);
    let Difference_In_Time = expireDate.getTime() - currentDate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days);
  }

  render() {
    let expireCalc = this.calculateDays(
      this.state.item.itemExpireDate
    ).toString();
    let usageSlider = (
      <MySlider
        name="Used"
        disabled={true}
        defaultValue={this.state.item.percentageUsed}
        onChange={() => {}}
      />
    );

    let expireDate = this.state.item.itemExpireDate ? (
      expireCalc >= 0 ? (
        <span>
          Expire in {expireCalc} {expireCalc > 1 ? "days" : "day"}
        </span>
      ) : (
        <span>Expired </span>
      )
    ) : (
      <span> Expire N/A</span>
    );
    let name = <span>{this.state.item.itemName}</span>;
    let brand = <span>{this.state.item.itemBrand}</span>;
    let note = <span>{this.state.item.note}</span>;
    let category = <span>In {this.state.item.category}</span>;
    let price = (
      <span>
        {this.state.item.itemPrice[0] + " " + this.state.item.itemPrice[1]}{" "}
      </span>
    );

    return (
      <div className="item-card-wrapper">
        <div className="row">
          <div className="col-6">
            {brand} {name}
          </div>
          <div className="col-6">{category}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6"> {price}</div>
          <div className="col-6">{expireDate}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12"> {usageSlider}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12">{note}</div>
        </div>
      </div>
    );
  }
}

export default ItemCard;
