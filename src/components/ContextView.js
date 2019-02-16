import React, { Component } from "react";
import PoseNet from "./PoseNet/PoseNet";
import "./ContextView.scss";

export default class ContextView extends Component {
  render() {
    switch (this.props.current_intent) {
      case "Default Welcome Intent":
        return (
          <div style={{ margin: "30px", textAlign: "left" }}>
            <h1> Intro text </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              lectus libero, aliquam at molestie eget, aliquet non sapien.
              Nullam lacinia posuere dui ac viverra. Cras pharetra nisi nisi, id
              pretium eros pellentesque vehicula. Mauris pulvinar est nec eros
              viverra dapibus vitae sit amet est. Sed et pellentesque erat, id
              laoreet est. Cras vulputate arcu eu felis dignissim suscipit.
              Nulla vehicula gravida tortor eget feugiat.
            </p>
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
