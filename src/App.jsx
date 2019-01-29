import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notification from './Notification.jsx';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    this.socket = null;

  }

//stringify new message then send to the server
  addMessage = (message) => {
    // const existingMessages = this.state.messages;
    // const newMessages = existingMessages.concat(message)
    // this.setState({
    //   messages: newMessages
    // })

    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

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
   }
   )
  }
}

  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Notification />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />
    </div>
    );


  }
}
export default App;
