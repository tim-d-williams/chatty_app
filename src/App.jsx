import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notification from './Notification.jsx';
import Message from './Message.jsx';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientCount: 0
    };

    this.socket = null;

  }

//stringify new message then send to the server
  addMessage = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  addUsername = (message) => {
    this.socket.send(JSON.stringify(message))
    const name = message.username
    this.setState({
      currentUser: {
        name
      }
    })
  }

  handleClientCount = (data) => {
    this.setState({
      clientCount: data.count
    })
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onopen = () => {
        console.log('Connected to Server')
    }

    this.socket.onmessage = (event) => {
    const parsedMessage = JSON.parse(event.data)

    let messageType = parsedMessage.type
    if (messageType === 'clientCount') {
      const usernameColor = parsedMessage.payload.color;
      this.handleClientCount(parsedMessage.payload)
    } else {
      const messages = this.state.messages.concat(parsedMessage)
      this.setState({
        messages: messages
      })
    }

    }
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="user-count">{this.state.clientCount} users online</span>
        </nav>
        <MessageList messages={this.state.messages} usernameColor={this.usernameColor}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} addUsername={this.addUsername}/>
    </div>
    );


  }
}
export default App;
