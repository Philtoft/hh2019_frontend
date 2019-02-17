import React, { Component } from "react";
import PoseNet from "./PoseNet/PoseNet";
import GenderChooser from  "./GenderChooser/GenderChooser";
export default class PoseNetContainer extends Component {
  render() {

    //return <PoseNet />;
    return ( <div className="column">
              <GenderChooser  genderChooser = {this.props.genderChooser}/>
              <PoseNet />
            </div>);
  }
}
