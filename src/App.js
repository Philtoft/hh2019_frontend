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
      gender: "female"
    };
  }
  componentDidMount() {
    this.axios_instance = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" }
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div className="main">
        <ContextView data={data} />
      </div>
    );
  }
}

export default App;
