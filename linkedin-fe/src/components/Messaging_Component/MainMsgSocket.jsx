import React, { PureComponent } from "react";
import { Row, Col } from "react-bootstrap";

export default class MainMsgSocket extends PureComponent {
  state = {
    allMsg: [],
  };

  getMessages = async username => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/messages/${username}`
      );
      if (response.ok) {
        let data = await response.json();
        return data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  messageFilter = async () => {
    let myMessages = await this.getMessages(this.props.username);

    //myMessages
    let messageSent = myMessages.filter(
      msg => msg.to === this.props.selectedUser
    );

    //received messages
    let receivedMessage = myMessages.filter(
      msg => msg.from === this.props.selectedUser
    );

    let allMessages = messageSent.concat(receivedMessage);
    let sort = allMessages.sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );

    this.setState({ allMsg: sort });
  };

  async componentDidUpdate(prevProps) {
    if (this.props.selectedUser !== prevProps.selectedUser) {
      this.messageFilter();
    }
  }

  handleOnSend = async e => {
    if (e.keyCode === 13) {
      this.filterMessages();
    }
    this.filterMessages();
  };

  render() {
    const { message, handleMessage, sendMessage, messages } = this.props;

    return (
      <div id="main-msg">
        <header>New Message</header>
        <div className="currentChat">
          {this.props.selectedUser ? this.props.selectedUser : "Select a user"}
        </div>
        <div className="msg-dialog">
          <ul className="px-0">
            {messages.concat(this.state.allMsg).map((msg, i) => {
              return (
                <li
                  key={i}
                  className={` px-0 ${
                    msg.from === this.props.username ? "message" : "ownMessage"
                  }`}
                >
                  <img
                    src="https://i.pravatar.cc/50"
                    className={`d-flex ${
                      msg.from === this.props.username
                        ? "flex-start"
                        : "flex-end"
                    } rounded-circle position-absolute`}
                    alt="avatar"
                  />
                  <strong>{msg.from}</strong>
                  <p className="pl-5"> {msg.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="msg-sender">
          <input
            autoComplete="off"
            type="text"
            placeholder="Write here your text..."
            value={message}
            onChange={e => handleMessage(e)}
            onKeyDown={this.typeText}
            autoComplete="off"
          />
          <button>
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
        <div className="media-uploads">
          <div className="media-icons">
            <i className="fas fa-image"></i>
            <i className="fas fa-paperclip"></i>
            <span>GIF</span>
            <i className="far fa-smile"></i>
            <i className="fas fa-video"></i>
          </div>
          <div className="msg-options">
            <button onClick={e => sendMessage(e)}>Send</button>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
      </div>
    );
  }
}
