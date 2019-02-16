import React, { Component } from "react";
import PoseNet from "./PoseNet/PoseNet";
import "./ContextView.scss";

export default class ContextView extends Component {
  render() {
    switch (this.props.current_intent) {
      case "Default Welcome Intent":
        return (
          <div className="context_view">
            <PoseNet />
          </div>
        );
      case "Point Pain Location":
        return (
          <div className="context_view">
            <PoseNet />
          </div>
        );
      default:
        return <div>HELLO (somethings wrong here</div>;
    }
  }
}
