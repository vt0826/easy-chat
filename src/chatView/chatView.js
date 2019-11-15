import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import NewChat from "../newChat/newChat";

import styled from "styled-components";
import { DisplayXSmall, TextLarge, DisplayMedium } from "../Typography";
import { StyledButtonContainer } from "../chatList/style";

class ChatView extends React.Component {
  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  render() {
    if (this.props.chat === undefined) {
      return (
        <StyledContainer>
          <NewChat newChat={this.props.newChat} />
        </StyledContainer>
      );
    } else {
      return (
        <>
          <StyledTitleContainer>
            <DisplayXSmall>To: {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0]}</DisplayXSmall>
          </StyledTitleContainer>
          <StyledContainer>
            <StyledMain id="chatview-container">
              {this.props.chat.messages.map((msg, index) => {
                return (
                  <StyledMessageDiv user={msg.sender === this.props.userEmail} key={index}>
                    <StyledTextLarge user={msg.sender === this.props.userEmail} key={index}>
                      {msg.message}
                    </StyledTextLarge>
                  </StyledMessageDiv>
                );
              })}
            </StyledMain>
          </StyledContainer>
        </>
      );
    }
  }
}

export default ChatView;
const StyledTitleContainer = styled.div`
  height: 5%;
  display: flex;
  justify-content: center;
`;
const StyledContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  overflow: auto;
  flex-direction: column;
`;
const StyledMain = styled.div``;
const StyledMessageDiv = styled.div`
  display: flex;
  justify-content: ${props => (props.user ? "flex-end" : "flex-start")};
`;
const StyledTextLarge = styled(TextLarge)`
  background-color: ${props => (props.user ? "#080808" : "#EFEFF2")};
  color: ${props => (props.user ? "white" : "black")};

  border-radius: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin: 7px 4px;
`;
