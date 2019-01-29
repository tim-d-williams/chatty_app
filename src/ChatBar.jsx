import React, {Component} from 'react';

class ChatBar extends Component {

 // capture change events from the input and update state
 handleChangeMessage = event => {
   let username = this.props.currentUser.name
   let content = event.target.value;
  // let id = this.props.currentUser.id
   this.setState( {
      content,
      username
  })
}

handleChangeUsername = event => {
  let username = event.target.value;
  console.log(username)
   this.setState( {
      username,

  })
}

  //when enter key is pressed set state to new value
  handleKeyPressUsername = event => {
    if(event.key == 'Enter') {
      const username = this.state.username;
      this.props.addUsername(username);
    }
  }

  handleOnBlurUsername = event => {
      const username = this.state.username;
      this.props.addUsername(username);
  }

  //when enter key is pressed set state to new value
  handleKeyPressMessage = event => {
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
            type="text"
            defaultValue={this.props.username}
            onChange={this.handleChangeUsername}
            onKeyPress={this.handleKeyPressUsername}
            onBlur={this.handleOnBlurUsername}
          />

          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            type="text"
            onChange={this.handleChangeMessage}
            onKeyPress={this.handleKeyPressMessage}
          />

      </footer>
    )
  }
}

export default ChatBar;
