import React, { Component } from "react";
import "../styles/ItemDetailStyle.scss";
import { connect } from "react-redux";
import MySlider from "../component/utility/MySlider.js";
import MyInput from "../component/utility/MyInput.js";
import MyButton from "../component/utility/MyButton.js";

class ItemDetail extends Component {
  render() {
    if (this.props.item == null) {
      this.props.history.push("/");
      return null;
    } else {
      let date = 5;
      let usageSlider = (
        <MySlider name="Usage" defaultValue="0" onChange={value => {}} />
      );
      let expireDateSlider = (
        <MySlider
          name={"Expire" + date}
          defaultValue="0"
          onChange={value => {}}
        />
      );
      let expireDate = (
        <div className="expireDate-wrapper">
          <label>Expire Date :</label>
          <input className="expireDate-picker" type="date" />
        </div>
      );
      let itemName = (
        <MyInput
          name="Name"
          id="itemName"
          placeholder="enter name"
          onChange={e => {
            console.log(e);
          }}
        />
      );
      let itemFavor = (
        <MyInput
          name="Flavor"
          id="itemFlavor"
          placeholder="N/A"
          onChange={e => {
            console.log(e);
          }}
        />
      );
      let itemBrand = (
        <MyInput
          name="Brand"
          inputID="itemBrand"
          placeholder="N/A"
          onChange={e => {
            console.log(e);
          }}
        />
      );
      let itemDailyUsage = (
        <MyInput
          name="Daily Usage"
          id="itemDailyUsage"
          placeholder="By percent"
          onChange={e => {
            console.log(e);
          }}
        />
      );
      let itemNote = (
        <MyInput
          name="Note"
          id="itemDailyUsage"
          placeholder="N/A"
          onChange={e => {
            console.log(e);
          }}
        />
      );
      let saveBtn = (
        <MyButton
          text="Save"
          extraclassname="btn-custom-green"
          onClick={() => {}}
        />
      );
      let deleteBtn = (
        <MyButton
          text="Delete"
          extraclassname="btn-custom-red"
          onClick={() => {}}
        />
      );
      let category = (
        <div className="category-wrapper">
          <label>Category :</label>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            defaultValue="0"
          >
            <option value="0">Choose...</option>
            <option value="1">Kitchen</option>
            <option value="2">Medicine</option>
            <option value="3">Bathroom</option>
            <option value="4">General</option>
          </select>
        </div>
      );
      return (
        <div className="item-detail-wrapper">
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
