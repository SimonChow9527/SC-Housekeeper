import React, { Component } from "react";
import "../styles/ItemDetailStyle.scss";
import { connect } from "react-redux";
import MySlider from "../component/utility/MySlider.js";
import MyInput from "../component/utility/MyInput.js";
import MyButton from "../component/utility/MyButton.js";
import { Category } from "./Constants.js";

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item
    };

    this.calculateDays = this.calculateDays.bind(this);
    this.calculateExpireSlider = this.calculateExpireSlider.bind(this);
    this.updateState = this.updateState.bind(this);
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

  updateState(e, targetname) {
    let value = e.target.value;
    this.setState(prevState => ({
      item: {
        ...prevState.item,
        [targetname]: value
      }
    }));
  }
  render() {
    if (this.props.item == null) {
      this.props.history.push("/");
      return null;
    } else {
      let date =
        this.state.item.ExpireDate === ""
          ? ""
          : " in " +
            this.calculateDays(
              new Date(),
              new Date(this.state.item.ExpireDate)
            ) +
            " day(s)";
      let usageSlider = (
        <MySlider
          name="Usage"
          defaultValue={
            this.state.item.Usage === null ? "0" : this.state.item.Usage
          }
          onChange={value =>
            this.setState(prevState => ({
              item: {
                ...prevState.item,
                Usage: value
              }
            }))
          }
        />
      );
      //ideally the handle position & track position should be calculated from expire date and start date
      //but rc-slider has some problems to set value programmatically
      //I will keep an eye on this, but as the only user(quite possiblely) of this app, I'm happy with current solution
      //check out https://github.com/react-component/slider/issues/366 for more info
      let expireDateSlider = (
        <MySlider
          name={"Expire" + date}
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
      let expireDate = (
        <div className="expireDate-wrapper">
          <label>Expire Date :</label>
          <input
            className="expireDate-picker"
            id="expire-date-picker"
            name="ExpireDate"
            defaultValue={this.state.item.ExpireDate}
            type="date"
            onChange={e => this.updateState(e, "ExpireDate")}
          />
        </div>
      );
      let itemName = (
        <MyInput
          name="Name"
          id="itemName"
          placeholder={
            this.state.item.Name === "" ? "enter name" : this.state.item.Name
          }
          value={this.state.item.Name}
          onChange={e => this.updateState(e, "Name")}
        />
      );
      let itemFavor = (
        <MyInput
          name="Flavor"
          id="itemFlavor"
          placeholder={
            this.state.item.Flavor === "" ? "N/A" : this.state.item.Flavor
          }
          value={this.state.item.Flavor}
          onChange={e => this.updateState(e, "Flavor")}
        />
      );
      let itemBrand = (
        <MyInput
          name="Brand"
          inputID="itemBrand"
          placeholder={
            this.state.item.Brand === "" ? "N/A" : this.state.item.Brand
          }
          value={this.state.item.Brand}
          onChange={e => this.updateState(e, "Brand")}
        />
      );
      let itemDailyUsage = (
        <MyInput
          name="Daily Usage (%)"
          id="itemDailyUsage"
          placeholder={
            this.state.item.DailyUsage === ""
              ? "N/A"
              : this.state.item.DailyUsage
          }
          value={this.state.item.DailyUsage}
          onChange={e => this.updateState(e, "DailyUsage")}
        />
      );
      let itemNote = (
        <MyInput
          name="Note"
          id="itemDailyUsage"
          placeholder={
            this.state.item.Note === "" ? "N/A" : this.state.item.Note
          }
          value={this.state.item.Note}
          onChange={e => this.updateState(e, "Note")}
        />
      );

      let category = (
        <div className="category-wrapper">
          <label>Category :</label>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            defaultValue={
              this.state.item.Category !== ""
                ? this.state.item.Category
                : Category.Default
            }
            onChange={e => this.updateState(e, "Category")}
          >
            <option value={Category.Default}>Choose...</option>
            <option value={Category.Kitchen}>Kitchen</option>
            <option value={Category.Medicine}>Medicine</option>
            <option value={Category.Bathroom}>Bathroom</option>
            <option value={Category.General}>General</option>
          </select>
        </div>
      );
      let saveBtn = (
        <MyButton
          text="Save"
          extraclassname="btn-custom-green"
          handleClick={() => {
            console.log(this.state.item);
          }}
        />
      );
      let deleteBtn = (
        <MyButton
          text="Delete"
          extraclassname="btn-custom-red"
          handleClick={() => {
            console.log(this.state.item.id);
          }}
        />
      );
      let cancelBtn = (
        <MyButton
          text="X"
          extraclassname="btn-custom-red btn-cancel"
          handleClick={() => {
            this.props.history.goBack();
          }}
        />
      );
      return (
        <div className="item-detail-wrapper">
          {cancelBtn}
          <div className="container">
            <div className="row">
              <div className="col-4">{itemName}</div>
              <div className="col-8">{usageSlider}</div>
            </div>
            <div className="row">
              <div className="col-4">{itemFavor}</div>
              <div className="col-8">{expireDateSlider}</div>
            </div>
            <div className="row">
              <div className="col-4">{itemBrand}</div>
              <div className="col-4">{itemDailyUsage}</div>
              <div className="col-4">{expireDate}</div>
            </div>
            <div className="row">
              <div className="col-4">{category}</div>
              <div className="col-8">{itemNote}</div>
            </div>
            <div className="row justify-content-end">
              <div className="col-4">
                {saveBtn}
                {deleteBtn}
              </div>
            </div>
          </div>
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
