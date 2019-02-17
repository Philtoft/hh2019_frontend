import React, { Component } from "react";
import "./ContextView.scss";
import WelcomePage from "./WelcomePage/WelcomePage";
import PoseNetContainer from "./PoseNetContainer/PoseNetContainer";
import PainTypeView from "./PainTypeView/PainTypeView";
import SymptomsView from "./SymptomsView/SymptomsView";
import Results from "./Results/Results";
import GenderChooser from "./PoseNetContainer/GenderChooser/GenderChooser";

export default class ContextView extends Component {

  render() {
    const intent = this.props.data.currentIntent;
    console.log(intent);
    switch (intent) {
      case "cameraMode":
      case "mouseMode":
        if (this.props.data.genderChosen) {
          return (
            <div className="full-container">
              <PoseNetContainer
                genderChooser={this.props.genderChooser}
                data={this.props.data}
                setSelection={this.props.setSelection}
              />
              <PainTypeView data={this.props.data} sympClick={this.props.sympClick} painChoice={this.props.painChoice} />
            </div>
          );
        } else {
          return (
            <div className="full-container">
              <PoseNetContainer
                genderChooser={this.props.genderChooser}
                data={this.props.data}
                setSelection={this.props.setSelection}
              />
            </div>
          );
        }
      case "showStomach":
        return (
          <div className="full-container">
            <PoseNetContainer
              genderChooser={this.props.genderChooser}
              data={this.props.data}
              setSelection={this.props.setSelection}
            />
          </div>
        );
      case "pain":
        return (
          <div className="full-container">
            <PoseNetContainer
              genderChooser={this.props.genderChooser}
              data={this.props.data}
              setSelection={this.props.setSelection}
            />
            <PainTypeView data={this.props.data} sympClick={this.props.sympClick} painChoice={this.props.painChoice} />
          </div>
        );
      case "results":
        return (
          <div className="full-container">
            <PoseNetContainer
              genderChooser={this.props.genderChooser}
              data={this.props.data}
              setSelection={this.props.setSelection}
            />
            <PainTypeView data={this.props.data} sympClick={this.props.sympClick} painChoice={this.props.painChoice} />
            <Results />
          </div>
        );
      case "resultsFull":
        return (
          <div className="full-container">
            <PoseNetContainer
              genderChooser={this.props.genderChooser}
              data={this.props.data}
              setSelection={this.props.setSelection}
            />
            <PainTypeView data={this.props.data} sympClick={this.props.sympClick} painChoice={this.props.painChoice} />
            <Results visibleSymptoms={true} dia={true} />
          </div>
        );
      case "welcome":
        return (
          <div id="welcome">
            <WelcomePage
              data={this.props.data}
              clickCamera={this.props.clickCamera}
              clickMouse={this.props.clickMouse}
            />
          </div>
        );
      default:
        return (
          <div>
            <WelcomePage
              data={this.props.data}
              clickCamera={this.props.clickCamera}
              clickMouse={this.props.clickMouse}
            />
            <PainTypeView data={this.props.data} />
            <SymptomsView data={this.props.data} />
          </div>
        );
    }
  }
}
