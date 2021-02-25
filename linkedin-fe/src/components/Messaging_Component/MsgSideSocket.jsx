import React, { PureComponent } from "react";

export default class MsgSideSocket extends PureComponent {
  render() {
    const { users, selectHandler } = this.props;

    return (
      <div id="msg-side">
        <header>
          <p>Messaging</p>
          <div className="icons-msg">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          </div>
        </header>
        <div className="msg-side-body">
          {users.map((user, i) => (
            <div key={i} className="d-block">
              <h5 onClick={() => selectHandler(user)}>{user}</h5>
            </div>
          ))}
          <input type="text" placeholder="Search Messages" />
          <div className="msg-container"></div>
          <button>Start a new message</button>
        </div>
      </div>
    );
  }
}
