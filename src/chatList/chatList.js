import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import {
  StyledContainer,
  StyledButton,
  StyledChatUl,
  StyledChatLi,
  StyledAvatarDiv,
  StyledChatSummary,
  StyledAvatar,
  StyledSpan,
  StyledDisplayXSmall,
  StyledTextSmall,
} from './style';
import {
  DisplaySmall,
  DisplayXSmall,
  TextXLarge,
  TextMedium,
  TextLarge,
  TextSmall,
  DisplayMedium,
} from '../Typography';

class ChatList extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.chats.length > 0) {
      return (
        <StyledContainer>
          <StyledButton onClick={this.newChat}> New Message</StyledButton>
          <StyledChatUl>
            {this.props.chats.map((chat, index) => {
              return (
                <React.Fragment>
                  <StyledChatLi
                    selected={this.props.selectedChat}
                    onClick={() => this.selectedChat(index)}
                  >
                    <StyledAvatarDiv>
                      <StyledAvatar>
                        <StyledSpan>
                          {
                            chat.users.filter(
                              user => user != this.props.userEmail
                            )[0][0]
                          }
                        </StyledSpan>
                      </StyledAvatar>
                    </StyledAvatarDiv>
                    <StyledChatSummary>
                      <StyledDisplayXSmall>
                        {
                          chat.users.filter(
                            user => user != this.props.userEmail
                          )[0]
                        }
                      </StyledDisplayXSmall>
                      <StyledTextSmall>
                        {chat.messages[
                          chat.messages.length - 1
                        ].message.substring(0, 30)}
                      </StyledTextSmall>
                    </StyledChatSummary>
                    {chat.receiverHasRead === false &&
                    !this.userIsSender(chat) ? (
                      <div>unread</div>
                    ) : null}
                  </StyledChatLi>

                  <hr />
                </React.Fragment>
              );
            })}
          </StyledChatUl>

          <StyledButton onClick={this.signOut}>SIGN OUT</StyledButton>
        </StyledContainer>
      );
    } else {
      return (
        <main>
          <button onClick={this.newChat}> New Chat</button>
        </main>
      );
    }
  }

  newChat = () => {
    console.log('new chta click');
    this.props.newChatClicked();
  };
  selectedChat = index => {
    this.props.currentChatSelected(index);
  };

  userIsSender = chat =>
    chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

  signOut = () => firebase.auth().signOut();
}

export default ChatList;
