import React, { Component } from "react";
import "./ContextView.scss";
import WelcomePage from "./WelcomePage/WelcomePage";
import PoseNetContainer from "./PoseNetContainer/PoseNetContainer";
import PainTypeView from "./PainTypeView/PainTypeView";
import SymptomsView from "./SymptomsView/SymptomsView";

export default class ContextView extends Component {
  render() {
    return (
      <div>
        <WelcomePage data={this.props.data} />
        <PoseNetContainer data={this.props.data} />
        <PainTypeView data={this.props.data} />
        <SymptomsView data={this.props.data} />
      </div>
    );
  }
}
