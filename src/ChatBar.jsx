import React, {Component} from 'react';

class ChatBar extends Component {

    // capture change events from the input and update state
    handleChange = event => {
      event.preventDefault();
      let username = this.props.currentUser.name;
      let content = event.target.value;
      this.setState( {
          content,
          username
      })
    }

    //when enter key is pressed set state to new value
    handleKeyPress = event => {
      if(event.key == 'Enter'){
        event.preventDefault()
        this.setState (
          this.state
        )
        console.log(this.state)
      }
    }

  render() {

    return  (
      <footer className="chatbar">

          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            value={this.props.currentUser.name}
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
