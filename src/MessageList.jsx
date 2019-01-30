import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {

    const messages = this.props.messages;
    const messageItem = messages.map(message => {

      switch(message.type) {
        case "incomingMessage":
          return <Message text={message} id={message.id} />
          break;
        case "incomingNotification":
          return <Notification text={message} id={message.id}/>
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + message.type);
      }

    })


    return  (
      <main className="messages">
        {messageItem}
      </main>
      )
    }
  }

export default MessageList;