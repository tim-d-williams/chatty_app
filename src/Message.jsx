import React, {Component} from 'react';


class Message extends Component {
  render() {

    return  (

      <div className="message">
        <span className="message-username" style={{color: this.props.color}} >{this.props.text.username}</span>
        <span className="message-content">{this.props.text.content}</span>
      </div>
      )
    }
  }

export default Message;
