import React, { Component } from "react";
import PoseNet from "./PoseNet/PoseNet";
import GenderChooser from "./GenderChooser/GenderChooser";
export default class PoseNetContainer extends Component {
  render() {
    //return <PoseNet />;
    if (this.props.data.currentIntent === "showStomach") {
      return (
        <div className="column">
          <GenderChooser genderChooser={this.props.genderChooser} />
          <PoseNet setSelection={this.props.setSelection} />
        </div>
      );
    } else if (
      this.props.data.imgUrl !== "" &&
      (this.props.data.currentIntent === "pain" || this.props.data.currentIntent === "results" || this.props.data.currentIntent === "resultsFull")
    ) {
      return (
        <div className="column">
          <GenderChooser genderChooser={this.props.genderChooser} />
          <img className="screenshot" src={this.props.data.imgUrl} alt="" />
        </div>
      );
    } else {
      return (
        <div className="column">
          <GenderChooser genderChooser={this.props.genderChooser} />
        </div>
      );
    }
  }
}
