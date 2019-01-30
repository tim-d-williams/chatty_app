import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notification from './Notification.jsx';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
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

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onopen = () => {
        console.log('Connected to Server')
    }

    this.socket.onmessage = (event) => {
    const receivedMessage = JSON.parse(event.data)
    console.log(receivedMessage)
    const messages = this.state.messages.concat(receivedMessage)
    this.setState({
      messages: messages
    })
    }
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>

        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} addUsername={this.addUsername}/>
    </div>
    );


  }
}
export default App;
