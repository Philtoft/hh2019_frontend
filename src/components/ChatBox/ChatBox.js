import React, { Component } from "react";
import "./ChatBox.sass";
import ChatBubble from "./ChatBubble/ChatBubble";

class ChatBox extends Component {
  render() {
    const chat = this.props.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );
    return (
      <div>
        <div className="chat-window">
          <div className="conversation-view">{chat}</div>
          <div className="message-box">
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.userMessage}
                onInput={this.handleTextInput}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit Enter to send"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ChatBox;
