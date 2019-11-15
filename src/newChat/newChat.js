import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

import styled from "styled-components";
import { DisplayXSmall, TextXLarge, DisplayMedium } from "../Typography";

class NewChat extends React.Component {
  constructor() {
    super();
    this.state = {
      friendEmail: null,
      newMessage: null
    };
  }
  render() {
    console.log(this.props);
    return (
      <StyledFlexContainer>
        <DisplayMedium>Send Message </DisplayMedium>
        <StyledFlexItem>
          <form onSubmit={e => this.submitNewChat(e)}>
            <DisplayXSmall> Enter Friend's Email</DisplayXSmall>
            <StyledInput id="login-email-input" onChange={e => this.inputHandler("email", e)} />
            <DisplayXSmall> Enter Your Message</DisplayXSmall>
            <StyledInput id="login-password-input" onChange={e => this.inputHandler("message", e)} />
            <div>
              <StyledButton type="submit">Send </StyledButton>
            </div>
          </form>
        </StyledFlexItem>
      </StyledFlexContainer>
    );
  }

  inputHandler = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ friendEmail: e.target.value });
        break;
      case "message":
        this.setState({ newMessage: e.target.value });
        break;

        deault: break;
    }
  };

  messageTyping = e => (e.keyCode === 13 ? this.submitMessage() : this.setState({ text: e.target.value }));

  submitNewChat = async e => {
    e.preventDefault();
    const userExists = await this.userExist();

    console.log(userExists);
    if (userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.newChat();
    }
  };

  newChat = props => {
    console.log(this.props, "hih");
    this.props.newChat({
      sendTo: this.state.friendEmail,
      message: this.state.newMessage
    });
  };

  goToChat = () => {
    this.props.goToChat(this.buildDocKey(), this.state.newMessage);
  };

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.friendEmail].sort().join(":");
  };

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  };

  userExist = async () => {
    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .get();
    const exists = usersSnapshot.docs.map(doc => doc.data().email).includes(this.state.friendEmail);
    this.setState({ serverError: !exists });
    return exists;
  };
}

export default NewChat;

const StyledFlexContainer = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const StyledFlexItem = styled.div`
  padding: 5px;
  flex: 0 0 100%;
  margin-top: 10px;
  text-align: center;
`;
const StyledForm = styled.form`
  display flex;
  flex-flow: column wrap;
  justify-content: flex-end;
   `;
const StyledInput = styled.input`
  width: 50%;
  height: 20px;
`;

const StyledButton = styled.button`
  width: 30%
  cursor: pointer;
  background: #080808;
  font-size: 16px;
  color: white
  margin-top:20px;
  padding: 8px;

`;
