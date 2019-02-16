import React, { Component } from "react";
import "./App.scss";
import ContextView from "./components/ContextView";

import axios from "axios";

const BASE_URL = "http://localhost:5000";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_intent: "Default Welcome Intent"
    };
  }
  componentDidMount() {
    this.axios_instance = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" }
    });
  }
  render() {
    return (
      <div className="main">
        <ContextView current_intent={this.state.current_intent} />
      </div>
    );
  }
}

export default App;
