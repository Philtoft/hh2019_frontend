import React, { Component } from "react";
import PoseNet from "./PoseNet/PoseNet";
import "./ContextView.scss";

export default class ContextView extends Component {
  render() {
    return (
      <div className="context_view">
        <PoseNet />
      </div>
    );
  }
}
