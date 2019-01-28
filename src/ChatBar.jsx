import React, {Component} from 'react';

class ChatBar extends Component {

 // capture change events from the input and update state
 handleChange = event => {
  let username = this.props.currentUser.name;
  let content = event.target.value;
  let id = this.props.currentUser.id
   this.setState( {
      content,
      username,
      id
  })
}

  //when enter key is pressed set state to new value
  handleKeyPress = event => {
    if(event.key == 'Enter') {
      const newMessage = this.state
      this.props.addMessage(newMessage);
      event.target.value = '';

    }
  }

  render() {

    return  (
      <footer className="chatbar">

          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue={this.props.currentUser.name}
          />

          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            type="text"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />

      </footer>
    )
  }
}

export default ChatBar;
