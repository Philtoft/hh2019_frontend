import React, { Component } from "react";
import "./App.scss";
import ContextView from "./components/ContextView";

import axios from "axios";
import { PoseNet } from "@tensorflow-models/posenet";

const BASE_URL = "http://localhost:5000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIntent: "welcome",
      painType: "",
      additionalSymptoms: "",
      painLocation: "",
      gender: true,
      genderChosen: false
    };
  }
  componentDidMount() {
    this.axios_instance = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" }
    });
  }

  genderChooser = () => {
    this.setState((previousState,props)=>({gender:!previousState.gender, genderChosen: true}));
  };

  clickCamera = () => {
    this.setState({currentIntent: 'cameraMode'});
  }

  clickMouse = () => {
    this.setState({currentIntent: 'mouseMode'});
  }

  render() {
    const data = this.state;
    return (
      <div className="main">
        <ContextView data={data} genderChooser = {this.genderChooser} clickCamera={this.clickCamera}  clickMouse={this.clickMouse} />
      </div>
    );
  }
}

export default App;
