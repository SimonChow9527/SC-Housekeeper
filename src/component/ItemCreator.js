import React, { Component } from "react";
import "../styles/ItemDetailStyle.scss";
import MySlider from "../component/utility/MySlider.js";
import MyInput from "../component/utility/MyInput.js";
import MyButton from "../component/utility/MyButton.js";
import { Category } from "./Constants.js";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import { toast } from "react-toastify";
import * as actionCreators from "../actions/actionCreators";

const { uuid } = require("uuidv4");

class ItemCreator extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      item: {
        ID: uuid(),
        Name: null,
        Flavor: null,
        Brand: null,
        Category: Category.Default,
        Usage: 0,
        DailyUsage: 0,
        StartDate: new Date().toLocaleDateString(),
        ExpireDate: null,
        isFinished: false,
        FinishDate: null,
        Note: null
      }
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

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.item.Name === null) toast.error("Name is required");
    else {
      let item = {
        ...this.state.item
      };
      this.props.addItem(item);
      this.props.history.push("/itemlist");
    }
  }

  render() {
    let date =
      this.state.item.ExpireDate === null
        ? ""
        : " in " +
          this.calculateDays(new Date(), new Date(this.state.item.ExpireDate)) +
          " day(s)";
    let usageSlider = (
      <MySlider
        name="Usage"
        defaultValue={this.state.item.Usage}
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

    let expireDateSlider = (
      <MySlider
        name={"Expire" + date}
        defaultValue={
          this.state.item.ExpireDate === null
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
          defaultValue={this.state.item.ExpireDate || ""}
          type="date"
          onChange={e => this.updateState(e, "ExpireDate")}
        />
      </div>
    );
    let itemName = (
      <MyInput
        name="Name"
        id="itemName"
        placeholder="Name (required)"
        value={this.state.item.Name || ""}
        onChange={e => this.updateState(e, "Name")}
      />
    );
    let itemFavor = (
      <MyInput
        name="Flavor"
        id="itemFlavor"
        placeholder="N/A"
        value={this.state.item.Flavor || ""}
        onChange={e => this.updateState(e, "Flavor")}
      />
    );
    let itemBrand = (
      <MyInput
        name="Brand"
        inputID="itemBrand"
        placeholder="N/A"
        value={this.state.item.Brand || ""}
        onChange={e => this.updateState(e, "Brand")}
      />
    );
    let itemDailyUsage = (
      <MyInput
        name="Daily Usage (%)"
        id="itemDailyUsage"
        placeholder="N/A"
        value={this.state.item.DailyUsage}
        onChange={e => this.updateState(e, "DailyUsage")}
      />
    );
    let itemNote = (
      <MyInput
        name="Note"
        id="itemDailyUsage"
        placeholder="N/A"
        value={this.state.item.Note || ""}
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
        handleClick={e => this.handleSubmit(e)}
      />
    );
    let deleteBtn = (
      <MyButton
        text="Delete"
        extraclassname="btn-custom-red"
        handleClick={() => {
          this.props.history.push("/");
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

const MapStateToProps = state => {
  return {
    cognitoUser: state.authReducer.cognitoUser,
    items: state.itemReducer.items
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addItem: data => dispatch(actionCreators.addItem(data))
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(ItemCreator);
