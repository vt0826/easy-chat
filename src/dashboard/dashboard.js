import React from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import ChatList from '../chatList/chatList';
import ChatView from '../chatView/chatView';

import ChatTextBox from '../chatTextBox/chatTextBox.js';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentChat: null,
      newChat: false,
      userEmail: '',
      chats: [],
    };
  }
  render() {
    return (
      <StyledContainer>
        <StyledChatList>
          <ChatList
            currentChatSelected={this.currentChatSelected}
            newChatClicked={this.newChatClicked}
            userEmail={this.state.userEmail}
            chats={this.state.chats}
            currentChat={this.state.currentChat}
          />
        </StyledChatList>
        <StyledDisplay>
          {this.state.newChat ? null : (
            <ChatView
              userEmail={this.state.userEmail}
              chat={this.state.chats[this.state.currentChat]}
            />
          )}
          {this.state.currentChat !== null && !this.state.newChat ? (
            <ChatTextBox
              messageRead={this.messageRead}
              submitMessage={this.submitMessage}
            />
          ) : null}
        </StyledDisplay>
      </StyledContainer>
    );
  }

  currentChatSelected = async chatIndex => {
    await this.setState({ currentChat: chatIndex });
    this.messageRead();
  };

  newChatClicked = () => {
    this.setState({ newChat: true, currentChat: null });
  };

  submitMessage = message => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.currentChat].users.filter(
        user => user !== this.state.userEmail
      )[0]
    );

    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.userEmail,
          message: message,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };

  buildDocKey = friend => [this.state.userEmail, friend].sort().join(':');

  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.currentChat].users.filter(
        user => user !== this.state.userEmail
      )[0]
    );
    if (this.recieverClickedChat(this.state.currentChat)) {
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log('click message where user is the sender');
    }
  };

  recieverClickedChat = chatIndex =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.userEmail;

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr) {
        this.props.history.push('/login');
      } else {
        await firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({ userEmail: _usr.email, chats: chats });
            console.log(this.state);
          });
      }
    });
  };
}
export default Dashboard;

const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  height: 100%;
`;
const StyledChatList = styled.div`
  flex-basis: 20%;
`;
const StyledDisplay = styled.div`
  flex-basis: 20%;
`;
