import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";

class ChatTextBox extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <StyledContainer>
        <StyledInput focus="false" placeholder=" Message" onKeyUp={e => this.messageTyping(e)} onFocus={this.clickTextBox} id="chatTextBox" />
      </StyledContainer>
    );
  }

  messageTyping = e => (e.keyCode === 13 ? this.submitMessage() : this.setState({ text: e.target.value }));

  textValid = text => text && text.replace(/\s/g, "").length;

  submitMessage = e => {
    if (this.textValid(this.state.text)) {
      this.props.submitMessage(this.state.text);
      document.getElementById("chatTextBox").value = "";
    }
    console.log("message send");
  };

  clickTextBox = () => this.props.messageRead();
}

export default ChatTextBox;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  height: 5%;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid black;
`;
const StyledInput = styled.input`
  font-size: 16px;
  flex-basis: 100%;
  outline: none;
`;
const StyledButton = styled.button`
  cursor: pointer;
  background-color: white;
  font-size: 16px;
  color: black;
  flex-basis: 10%;
  border: none;
`;
