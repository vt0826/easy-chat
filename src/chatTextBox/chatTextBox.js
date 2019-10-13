import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

class ChatTextBox extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <div>
        <textarea
          rows="3"
          cols="100"
          placeholder="Message"
          onKeyUp={e => this.messageTyping(e)}
          onFocus={this.clickTextBox}
          id="chatTextBox"
        />
        <button onClick={this.submitMessage}>send</button>
      </div>
    );
  }

  messageTyping = e =>
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({ text: e.target.value });

  textValid = text => text && text.replace(/\s/g, '').length;

  submitMessage = e => {
    if (this.textValid(this.state.text)) {
      this.props.submitMessage(this.state.text);
      document.getElementById('chatTextBox').value = '';
    }
    console.log('message send');
  };

  clickTextBox = () => this.props.messageRead();
}

export default ChatTextBox;
