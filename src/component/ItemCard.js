import React, { Component } from "react";
import "../styles/ItemListStyle.scss";
import MySlider from "../component/utility/MySlider.js";

class ItemCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item
    };

    this.calculateDays = this.calculateDays.bind(this);
    this.calculateExpireSlider = this.calculateExpireSlider.bind(this);
  }

  calculateDays(currentdate, expiredate) {
    let Difference_In_Time = expiredate.getTime() - currentdate.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days);
  }

  calculateExpireSlider(startdate, expiredate) {
    let startDate = new Date(startdate);
    let expireDate = new Date(expiredate);
    let currentDate = new Date();

    let fromStartToExpire = this.calculateDays(startDate, expireDate);
    let fromCurrentToExpire = this.calculateDays(currentDate, expireDate);

    return Math.round(
      ((fromStartToExpire - fromCurrentToExpire) / fromStartToExpire) * 100
    );
  }

  render() {
    let usageSlider = (
      <MySlider
        name="Used"
        defaultValue={this.state.item.Usage}
        onChange={() => {}}
      />
    );

    let expireDateSlider = (
      <MySlider
        name={"Expire"}
        defaultValue={
          this.state.item.ExpireDate === ""
            ? 0
            : this.calculateExpireSlider(
                this.state.item.StartDate,
                this.state.item.ExpireDate
              )
        }
        onChange={() => {}}
      />
    );
    let itemName = <span>{this.state.item.Name}</span>;
    let itemFavor = <span>{this.state.item.Flavor}</span>;
    let itemBrand = <span>{this.state.item.Brand}</span>;

    let itemNote = <span>{this.state.item.Note}</span>;

    let category = <span>Category: {this.state.item.Category}</span>;

    return (
      <div className="item-card-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-6">
              {itemBrand} {itemFavor} {itemName}
            </div>
            <div className="col-6">{category}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-6"> {usageSlider}</div>
            <div className="col-6">{expireDateSlider}</div>
          </div>
          <div className="row">
            <div className="col">{itemNote}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;
