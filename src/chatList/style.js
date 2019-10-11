import styled from 'styled-components';
import {
  DisplaySmall,
  DisplayXSmall,
  TextXLarge,
  TextMedium,
  TextLarge,
  TextSmall,
  TextXSmall,
  DisplayMedium,
} from '../Typography';

const StyledContainer = styled.div`
  height: 100vh;
  margin-top: 20px;
  margin-right: 20px;
  border-style: groove;
`;

const StyledButton = styled.button`
  width: 100%
  cursor: pointer;
  background: #3b5998;
  font-size: 16px;
  color: white
  margin-right:20px;
  padding: 8px;

`;

const StyledChatUl = styled.ul`
  padding-left: 0;
`;
const StyledChatLi = styled.li`
  list-style-type: none;
  :hover: {
    cursor: pointer;
  }
  display: flex;
`;

const StyledAvatarDiv = styled.div`
  flex: 0 1 25%;
`;
const StyledChatSummary = styled.div`
  flex: 0 1 75%;
  display: flex;
  flex-direction: column;
`;
const StyledAvatar = styled.div`
  width: 50px;
  height: 50px;

  background-color: #a9a9a9;
  text-align: center;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
`;

const StyledSpan = styled.span`
  position: relative;
  top: 12px;
  font-size: 25px;
  line-height: 25px;
  color: #fff;
  cursor: default;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0;
  cursor: default;
`;
const StyledTextSmall = styled(TextSmall)`
  margin: 0;
  cursor: default;
`;

export {
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
};
