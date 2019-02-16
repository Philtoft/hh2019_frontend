import React, { Component } from "react";
import "./ChatBubble.css";

export default class ChatBubble extends Component {
  render() {
    return (
      <div
        key={`${this.props.className}-${this.props.i}`}
        className={`${this.props.className} chat-bubble`}
      >
        <span className="chat-content">{this.props.text}</span>
      </div>
    );
  }
}
