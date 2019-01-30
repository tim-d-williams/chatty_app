import React, {Component} from 'react';

class Notification extends Component {

  render() {

    return  (
      <div className="message system">
      <span>{this.props.text.content}</span>
      </div>
      )
    }
  }

export default Notification;