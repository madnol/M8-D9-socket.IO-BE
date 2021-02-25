import React, { PureComponent } from "react";
import "../Messaging_Component/Messaging_Styles/MsgPage.scss";
import "../Messaging_Component/Messaging_Styles/MainMsg.scss";
import "../css/RightSide.scss";
import io from "socket.io-client";
import footericon from "../images/footericon.png";
import { withAuth0 } from "@auth0/auth0-react";
import MsgSideSocket from "./MsgSideSocket";
import MainMsgSocket from "./MainMsgSocket";

const connOpt = {
  transports: ["websocket", "polling"],
};

let socket = io("https://striveschool-api.herokuapp.com", connOpt);

class MsgPageSocket extends PureComponent {
  state = {
    username: null,
    message: "",
    messages: [],
    users: [],
    selectedUser: null,
  };

  handleMessage = e => {
    this.setState({ message: e.target.value });
  };

  sendMessage = e => {
    e.preventDefault();

    if (this.state.message !== "") {
      console.log(this.state.selectedUser);

      socket.emit("chatmessage", {
        to: this.state.selectedUser,
        text: this.state.message,
      });

      this.setState({ message: "" });
    }
  };

  componentDidMount() {
    const { user } = this.props.auth0;
    console.log(user);
    if (user !== undefined) {
      this.setState({ username: user.nickname });
    }

    socket.on("chatmessage", msg => {
      return this.setState({ messages: this.state.messages.concat(msg) });
    });

    socket.on("connect", () => console.log("connected", this.socket.id));
    socket.on("list", users => {
      this.setState({ users: [users] });
      console.log(this.state.users);
      //*SET
      //Set objects are collections of values.
      //You can iterate through the elements of a set
      // in insertion order. A value in the Set may only occur once;
      //it is unique in the Set's collection.
      let userNoDuplicate = [...new Set(users)];
      this.setState({
        users: this.state.users
          .concat(userNoDuplicate)
          .filter(x => x !== user.nickname),
      });
    });
    socket.emit("setUsername", {
      username: user.nickname,
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  selectHandler = user => {
    console.log("activated");
    this.setState({ selectedUser: user });
    console.log(this.state.selectedUser);
  };

  render() {
    return (
      <div id="msg-page">
        <div className="main-body">
          <MsgSideSocket
            users={this.state.users}
            selectHandler={this.selectHandler}
          />
          <MainMsgSocket
            username={this.state.username}
            message={this.state.message}
            handleMessage={e => this.handleMessage(e)}
            sendMessage={e => this.sendMessage(e)}
            messages={this.state.messages}
            selectedUser={this.state.selectedUser}
          />
        </div>
        <div id="footer-right" style={{ position: "sticky", top: "60px" }}>
          <div className="links-footer-right">
            <span>About</span>
            <span>Accessibility</span>
            <span>Help Center</span>
            <span>Privacy & Terms</span>
            <span>Ad Choices</span>
            <span>Advertising</span>
            <span>Business Services</span>
            <span>Get the LinkedIn app</span>
          </div>
          <p>More</p>
          <div className="linkedin-rights">
            <span>
              <img src={footericon} alt="" />
            </span>
            <span>Linkedin Corporation © 2020</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth0(MsgPageSocket);
