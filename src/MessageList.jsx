import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    const messages = this.props.messages;
    const messageItem = messages.map(message => {
      return <Message text={message} key={message.id} />

    })


    return  (
      <main className="messages">
      {messageItem}
      </main>
      )
    }
  }

export default MessageList;