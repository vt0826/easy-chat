import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import styled from 'styled-components';
import { DisplayXSmall, TextLarge, DisplayMedium } from '../Typography';

class ChatView extends React.Component {
  componentDidUpdate = () => {
    const container = document.getElementById('chatview-container');
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  render() {
    if (this.props.chat === undefined) {
      return <main id="chatview-container" />;
    } else {
      return (
        <StyledContainer>
          <main id="chatview-container">
            {this.props.chat.messages.map((msg, index) => {
              return (
                <StyledMessageDiv
                  user={msg.sender === this.props.userEmail}
                  key={index}
                >
                  <StyledTextLarge
                    user={msg.sender === this.props.userEmail}
                    key={index}
                  >
                    {msg.message}
                  </StyledTextLarge>
                </StyledMessageDiv>
              );
            })}
          </main>
        </StyledContainer>
      );
    }
  }
}

export default ChatView;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledMessageDiv = styled.div`
  display: flex;
  justify-content: ${props => (props.user ? 'flex-end' : 'flex-start')};
`;
const StyledTextLarge = styled(TextLarge)`
  background-color: ${props => (props.user ? 'black' : 'white')};
  color: ${props => (props.user ? 'white' : 'black')};

  border-radius: 7%;
  padding-left: 16px;
  padding-right: 16px;
`;
