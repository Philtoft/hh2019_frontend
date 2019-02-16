import React, { Component } from "react";
import "./App.scss";
import ContextView from "./components/ContextView";
import ChatBox from "./components/ChatBox/ChatBox";

import Pusher from "pusher-js";
import axios from "axios";

const BASE_URL = "http://localhost:5000";
const PUSHER_APP_KEY = "c29fb61653df94905e02";
const PUSHER_APP_CLUSTER = "eu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: "",
      conversation: [],
      current_intent: "Default Welcome Intent"
    };
  }
  componentDidMount() {
    this.axios_instance = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" }
    });
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
      encrypted: true
    });
    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", data => {
      const msg = {
        text: data.message,
        user: "ai"
      };
      debugger;
      this.setState({
        conversation: [...this.state.conversation, msg],
        current_intent: data.current_intent
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: "hackathon-guy"
    };

    this.setState({
      conversation: [...this.state.conversation, msg]
    });

    const data = JSON.stringify({
      message: this.state.userMessage
    });

    this.axios_instance
      .post("/chat", data)
      .then(this.setState({ userMessage: "" }));
  };

  handleTextInput = e => {
    this.setState({ userMessage: e.target.value });
  };

  render() {
    return (
      <div className="main">
        <ChatBox
          handleSubmit={this.handleSubmit}
          handleTextInput={this.handleTextInput}
          userMessage={this.state.userMessage}
          conversation={this.state.conversation}
        />
        <ContextView current_intent={this.state.current_intent} />
      </div>
    );
  }
}

export default App;
