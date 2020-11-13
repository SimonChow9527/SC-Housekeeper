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
import { v4 as uuidv4 } from "uuid";
import CreatableSelect from "react-select/creatable";

class ItemCreator extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      item: {
        id: uuidv4(),
        name: null,
        priceNumber: null,
        priceUnit: null,
        unit: null,
        brand: null,
        category: Category.Default,
        percentUsed: 0,
        expireDate: null,
        isFinished: false,
        note: null,
      },
    };

    this.updateState = this.updateState.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCategoryInputChange = this.handleCategoryInputChange.bind(this);
  }

  handleCategoryChange = (newValue: any) => {
    console.log(newValue);
  };
  handleCategoryInputChange = (inputValue: any, actionMeta: any) => {
    console.log(inputValue);
  };

  updateState(e, targetname) {
    let value = e.target.value;
    this.setState((prevState) => ({
      item: {
        ...prevState.item,
        [targetname]: value,
      },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.state.item.Name === null) toast.error("Name is required");
    else {
      let item = {
        ...this.state.item,
      };
      this.props.addItem(item);
      let myInit = {
        body: {
          userEmail: this.props.cognitoUser.attributes.email,
          ...this.state.item,
        },
      };
      await API.put("itemapi", "/items", myInit).catch((err) =>
        toast.error(err)
      );

      this.props.history.push("/itemlist");
    }
  }

  render() {
    let cateOptions = [
      { value: "kitchen", label: "kitchen" },
      { value: "bathroom", label: "bathroom" },
      { value: "DIY", label: "DIY" },
    ];

    let usageSlider = (
      <MySlider
        name="Usage"
        defaultValue={this.state.item.Usage}
        onChange={(value) =>
          this.setState((prevState) => ({
            item: {
              ...prevState.item,
              Usage: value,
            },
          }))
        }
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
          onChange={(e) => this.updateState(e, "ExpireDate")}
        />
      </div>
    );
    let itemName = <input className="my-input" placeholder="Name" />;
    let itemBrand = <input className="my-input" placeholder="Brand" />;
    let price = <input className="my-input" placeholder="Price" />;
    let priceUnit = <input className="my-input" placeholder="Unit" />;
    let itemNote = (
      <MyInput
        name="Note"
        id="itemDailyUsage"
        placeholder="N/A"
        value={this.state.item.Note || ""}
        onChange={(e) => this.updateState(e, "Note")}
      />
    );

    let category = (
      <div className="category-wrapper">
        <label>Category :</label>
        <CreatableSelect
          isClearable
          onChange={this.handleCategoryChange}
          onInputChange={this.handleCategoryInputChange}
          options={cateOptions}
        />
      </div>
    );
    let saveBtn = (
      <MyButton
        text="Save"
        extraclassname="btn-custom-green"
        handleClick={(e) => this.handleSubmit(e)}
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
            <div className="col-md-4 mb-3"> {itemBrand}</div>
            <div className="col-md-4 mb-3">{itemName}</div>
            <div className="col-md-2 mb-3">{price}</div>
            <div className="col-md-2 mb-3">{priceUnit}</div>
          </div>

          <div className="row">
            <div className="col-8">{usageSlider}</div>
          </div>
          <div className="row">
            <div className="col-4"></div>
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

const MapStateToProps = (state) => {
  return {
    cognitoUser: state.authReducer.cognitoUser,
    items: state.itemReducer.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (data) => dispatch(actionCreators.addItem(data)),
  };
};

export default connect(MapStateToProps, mapDispatchToProps)(ItemCreator);
