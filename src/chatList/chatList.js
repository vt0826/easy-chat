import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
import { StyledContainer, StyledButtonContainer, StyledButton, StyledChatUl, StyledChatLi, StyledAvatarDiv, StyledChatSummary, StyledSpan, StyledTextMedium, StyledTextSmall, StyledNewMessageIndicator, StyledNewMessageIndicatorDiv } from "./style";
import { DisplaySmall, DisplayXSmall, TextXLarge, TextMedium, TextLarge, TextSmall, DisplayMedium } from "../Typography";

class ChatList extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.chats.length > 0) {
      return (
        <>
          <StyledButtonContainer>
            <StyledButton onClick={this.newChat}> New Message</StyledButton>
          </StyledButtonContainer>
          <StyledContainer>
            <StyledChatUl>
              {this.props.chats.map((chat, index) => {
                return (
                  <React.Fragment key={index}>
                    <StyledChatLi selected={this.props.currentChat === index} onClick={() => this.selectedChat(index)}>
                      <StyledAvatarDiv>
                        <StyledAvatar selected={this.props.currentChat === index}>
                          <StyledSpan>{chat.users.filter(user => user != this.props.userEmail)[0][0]}</StyledSpan>
                        </StyledAvatar>
                      </StyledAvatarDiv>
                      <StyledChatSummary>
                        <StyledTextMedium>{chat.users.filter(user => user != this.props.userEmail)[0]}</StyledTextMedium>
                        <StyledTextSmall>{chat.messages[chat.messages.length - 1].message.substring(0, 30)}</StyledTextSmall>
                      </StyledChatSummary>
                      <StyledNewMessageIndicatorDiv>{chat.receiverHasRead === false && !this.userIsSender(chat) ? <StyledNewMessageIndicator /> : null}</StyledNewMessageIndicatorDiv>
                    </StyledChatLi>
                    <hr />
                  </React.Fragment>
                );
              })}
            </StyledChatUl>
          </StyledContainer>
          <StyledButtonContainer>
            <StyledButton onClick={this.signOut}>SIGN OUT</StyledButton>
          </StyledButtonContainer>
        </>
      );
    } else {
      return (
        <StyledButtonContainer>
          <StyledButton onClick={this.newChat}> New Chat</StyledButton>
        </StyledButtonContainer>
      );
    }
  }

  newChat = () => {
    this.props.newChatClicked();
  };
  selectedChat = index => {
    this.props.currentChatSelected(index);
    console.log(index, "cehck");
  };

  userIsSender = chat => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

  signOut = () => firebase.auth().signOut();
}

export default ChatList;

const StyledAvatar = styled.div`
  background-color: ${props => (props.selected ? "#e2e2e2" : null)};
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
`;
