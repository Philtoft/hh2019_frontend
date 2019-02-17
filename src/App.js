import React, { Component } from "react";
import "./App.scss";
import ContextView from "./components/ContextView";

import axios from "axios";

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
      genderChosen: false,
      imgUrl: ""
    };
  }

  componentDidMount() {
    this.axios_instance = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" }
    });
  }
  setSelection = (selection, location, url) => {
    this.setState({
      selection: selection,
      painLocation: location,
      currentIntent: "pain",
      imgUrl: url
    });
  };

  genderChooser = () => {
    this.setState((previousState, props) => ({
      gender: !previousState.gender,
      genderChosen: true,
      currentIntent: "showStomach"
    }));
  };

  painChoice = () => {
    this.setState((previousState, props) => ({
      currentIntent: "results"
    }));
  };

  sympClick = () => {
    this.setState((previousState, props) => ({
      currentIntent: "resultsFull"
    }));
  };

  clickCamera = () => {
    this.setState({ currentIntent: "cameraMode" });
  };

  clickMouse = () => {
    this.setState({ currentIntent: "mouseMode" });
  };

  render() {
    const data = this.state;
    return (
      <div className="main">
        <ContextView
          data={data}
          setSelection={this.setSelection}
          clickMouse={this.clickMouse}
          clickCamera={this.clickCamera}
          genderChooser={this.genderChooser}
          painChoice={this.painChoice}
          sympClick={this.sympClick}
        />
      </div>
    );
  }
}

export default App;
