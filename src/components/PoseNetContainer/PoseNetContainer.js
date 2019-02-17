import React, { Component } from "react";
import PoseNet from "./PoseNet/PoseNet";

export default class PoseNetContainer extends Component {
  constructor(props) {
    super(props, PoseNet.defaultProps);
    this.state = {
      selection: []
    };
  }

  setSelection = n => {
    this.setState(prevState => ({
      selection: [n, ...prevState.selection]
    }));
  };
  render() {
    return <PoseNet setSelection={this.setSelection} />;
  }
}
