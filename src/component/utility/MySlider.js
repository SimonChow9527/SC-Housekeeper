import React, { Component } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import "../../styles/UtilityStyle.scss";
import PropTypes from "prop-types";

const SliderWithTooltip = createSliderWithTooltip(Slider);

class MySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: "",
      firstTimeLoaded: true,
    };

    this.calColor = this.calColor.bind(this);
    this.percentFormatter = this.percentFormatter.bind(this);
  }

  percentFormatter(v) {
    return `${v}%`;
  }

  calColor(v) {
    let color;

    switch (true) {
      case v <= 60:
        color = "#28a745";
        break;
      case 60 < v && v < 80:
        color = "#ffc107";
        break;
      case v >= 80:
        color = "#dc3545";
        break;
      default:
        color = "#28a745";
        break;
    }
    return color;
  }

  render() {
    let defaultvalue = this.props.defaultValue
      ? parseInt(this.props.defaultValue)
      : 0;
    let color = this.state.firstTimeLoaded
      ? this.calColor(defaultvalue).toString()
      : this.calColor(this.state.sliderValue).toString();
    return (
      <div className="slider-wrapper">
        <span className="slider-text">{this.props.name + " "}</span>
        <SliderWithTooltip
          tipFormatter={(value) => this.percentFormatter(value)}
          defaultValue={defaultvalue}
          trackStyle={{
            backgroundColor: color,
          }}
          disabled={this.props.disabled}
          onChange={(value) => {
            this.setState({ sliderValue: value, firstTimeLoaded: false });
            this.props.onChange(value);
          }}
        />
      </div>
    );
  }
}

MySlider.propTypes = {
  name: PropTypes.string,
  // the start point of the slider
  defaultValue: PropTypes.string,
  //a function to handle value change
  onChange: PropTypes.func,
};

export default MySlider;
