import React, { Component } from "react";
import "./ContextView.scss";
import WelcomePage from "./WelcomePage/WelcomePage";
import PoseNetContainer from "./PoseNetContainer/PoseNetContainer";
import PainTypeView from "./PainTypeView/PainTypeView";
import SymptomsView from "./SymptomsView/SymptomsView";

export default class ContextView extends Component {

  render() {
    const intent = this.props.data.currentIntent;
    console.log(intent);
    switch(intent){
      case "cameraMode":
      case "mouseMode":
        return(
          <div id="column1">
            <PoseNetContainer genderChooser={this.props.genderChooser} data = {this.props.data} />
            <PainTypeView data={this.props.data} />
            <SymptomsView data={this.props.data} />
          </div>
        );
      case "welcome":
        return(
          <div  id="welcome">
            <WelcomePage 
            data={this.props.data} 
            clickCamera = {this.props.clickCamera} 
            clickMouse = {this.props.clickMouse}
            />
          </div>
        )
      default:
        return (
          <div>
            <WelcomePage 
              data={this.props.data} 
              clickCamera = {this.props.clickCamera} 
              clickMouse = {this.props.clickMouse}
            />
            <PainTypeView data={this.props.data} />
            <SymptomsView data={this.props.data} />
          </div>
        );
    }
    
    
  }
}
