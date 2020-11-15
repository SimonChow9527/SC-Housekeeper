import React, { Component } from "react";
import "../styles/ItemDetailStyle.scss";
import MySlider from "../component/utility/MySlider.js";
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
    let brandOptions = [
      { value: "Woolworth", label: "Woolworth" },
      { value: "Coles", label: "Coles" },
      { value: "Aldi", label: "Aldi" },
    ];
    let nameOptions = [
      { value: "Corn Chip", label: "Corn Chip" },
      { value: "Tim Tam", label: "Tim Tam" },
      { value: "Diet Coke", label: "Diet Coke" },
    ];

    return (
      <form className="item-detail-wrapper">
        <button
          className="my-button cancel-button"
          type="button"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          x
        </button>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Brand</label>
            <CreatableSelect
              isClearable
              onChange={this.handleCategoryChange}
              onInputChange={this.handleCategoryInputChange}
              options={brandOptions}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Name</label>
            <CreatableSelect
              isClearable
              onChange={this.handleCategoryChange}
              onInputChange={this.handleCategoryInputChange}
              options={nameOptions}
            />
          </div>
        </div>
        <div className="form-row">
          <div className=" form-group col-md-6">
            <label>Category</label>
            <CreatableSelect
              isClearable
              onChange={this.handleCategoryChange}
              onInputChange={this.handleCategoryInputChange}
              options={cateOptions}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="itemPriceInput">Price</label>
            <input
              type="text"
              className="my-input"
              id="itemPriceInput"
              placeholder="Price"
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="itemPriceUnitInput">Unit</label>
            <input
              type="text"
              className="my-input"
              id="itemPriceUnitInput"
              defaultValue="AUD"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="usedSlider">Percent Used</label>
            <MySlider
              name="Used"
              defaultValue={this.state.item.Usage}
              id="usedSlider"
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="usedSlider">Expire Date</label>
            <input
              className="expireDate-picker"
              id="expire-date-picker"
              name="ExpireDate"
              defaultValue={this.state.item.ExpireDate || ""}
              type="date"
              onChange={(e) => this.updateState(e, "ExpireDate")}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="itemNote">Note</label>
            <input
              name="Note"
              className="my-input"
              id="itemNote"
              placeholder="N/A"
              value={this.state.item.Note || ""}
              onChange={(e) => {}}
            />
          </div>
        </div>
        <div className="form-row">
          <ul className="option-ul">
            <li>
              <div>
                <div className="text-deco">
                  <strong>Add to Shopping list</strong>
                </div>
                <div className="text-deco">Add Item to shopping list</div>
              </div>
              <button type="button" className="btn btn-info">
                Add to shopping list
              </button>
            </li>
            <li>
              <div>
                <div className="text-deco">
                  <strong>Add to bills</strong>
                </div>
                <div className="text-deco">
                  Add Item to bills and later send bills to someone
                </div>
              </div>
              <button type="button" className="btn btn-info">
                Add to bills
              </button>
            </li>
            <li>
              <div>
                <div className="text-deco">
                  <strong>Set Alert</strong>
                </div>
                <div className="text-deco">
                  Create custom alert for this item
                </div>
              </div>
              <button type="button" className="btn btn-info">
                Set Alert
              </button>
            </li>
          </ul>
        </div>
        <div className="form-row">
          <ul className="option-ul">
            <li>
              <div>
                <div className="text-deco">
                  <strong>Save</strong>
                </div>
                <div className="text-deco">Create item or save changes</div>
              </div>
              <button type="button" className="btn btn-success">
                Save
              </button>
            </li>
            <li>
              <div>
                <div className="text-deco">
                  <strong>Mark Item as finished</strong>
                </div>
                <div className="text-deco">Check that item later in stats</div>
              </div>
              <button type="button" className="btn btn-success">
                Mark as Finished
              </button>
            </li>
            <li>
              <div>
                <div className="text-deco">
                  <strong>Delete</strong>
                </div>
                <div className="text-deco">This will delete item forever</div>
              </div>
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </li>
          </ul>
        </div>
      </form>
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
