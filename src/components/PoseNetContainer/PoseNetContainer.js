import React, { Component } from "react";
import PoseNet from "./PoseNet/PoseNet";
import GenderChooser from "./GenderChooser/GenderChooser";
export default class PoseNetContainer extends Component {
  render() {
    //return <PoseNet />;
    if (this.props.data.genderChosen) {
      return (
        <div className="column">
          <GenderChooser genderChooser={this.props.genderChooser} />
          <PoseNet setSelection={this.props.setSelection} />
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
