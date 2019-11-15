import React from "react";
import firebase from "firebase";
import styled from "styled-components";
import ChatList from "../chatList/chatList";
import ChatView from "../chatView/chatView";

import NewChat from "../newChat/newChat";
import ChatTextBox from "../chatTextBox/chatTextBox.js";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentChat: null,
      newChat: false,
      userEmail: "",
      chats: []
    };
  }
  render() {
    return (
      <StyledContainer>
        <StyledChatList>
          <ChatList currentChatSelected={this.currentChatSelected} newChatClicked={this.newChatClicked} userEmail={this.state.userEmail} chats={this.state.chats} currentChat={this.state.currentChat} />
        </StyledChatList>
        <StyledDisplay>
          {this.state.newChat ? null : <ChatView userEmail={this.state.userEmail} chat={this.state.chats[this.state.currentChat]} newChat={this.newChatSubmit} />}
          {this.state.currentChat !== null && !this.state.newChat ? <ChatTextBox messageRead={this.messageRead} submitMessage={this.submitMessage} newChat={this.newChatSubmit} /> : null}
          {this.state.newChat ? <NewChat newChat={this.newChatSubmit} goToChat={this.goToChat} /> : null}
        </StyledDisplay>
      </StyledContainer>
    );
  }

  currentChatSelected = async chatIndex => {
    await this.setState({ currentChat: chatIndex, newChat: false });
    this.messageRead();
  };

  newChatClicked = () => {
    this.setState({ newChat: true, currentChat: null });
  };

  submitMessage = message => {
    const docKey = this.buildDocKey(this.state.chats[this.state.currentChat].users.filter(user => user !== this.state.userEmail)[0]);

    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.userEmail,
          message: message,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
  };

  buildDocKey = friend => [this.state.userEmail, friend].sort().join(":");

  messageRead = () => {
    const docKey = this.buildDocKey(this.state.chats[this.state.currentChat].users.filter(user => user !== this.state.userEmail)[0]);
    if (this.recieverClickedChat(this.state.currentChat)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("click message where user is the sender");
    }
  };

  newChatSubmit = async chatObj => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        messages: [
          {
            message: chatObj.message,
            sender: this.state.userEmail
          }
        ],
        users: [this.state.userEmail, chatObj.sendTo],
        receiverHasRead: false
      });
    this.setState({ newChat: false });
    this.currentChatSelected(this.state.chats.length - 1);
  };

  goToChat = async (docKey, message) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
    this.setState({ newChat: false });
    await this.currentChatSelected(this.state.chats.indexOf(chat));
    this.submitMessage(message);
  };

  recieverClickedChat = chatIndex => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.userEmail;

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr) {
        this.props.history.push("/login");
      } else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            this.setState({ userEmail: _usr.email, chats: chats });
            console.log(this.state);
          });
      }
    });
  };
}
export default Dashboard;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
`;
const StyledChatList = styled.div`
  flex-basis: 20%;
  height: 100%;
  box-shadow: inset 0px 0px 0px 1px black;
`;
const StyledDisplay = styled.div`
  flex-basis: 80%;
  height: 100%;
`;
