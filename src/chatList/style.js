import styled from "styled-components";
import { DisplaySmall, DisplayXSmall, TextXLarge, TextMedium, TextLarge, TextSmall, TextXSmall, DisplayMedium } from "../Typography";

const StyledContainer = styled.div`
  height: 90%;
  overflow: auto;
`;
const StyledButtonContainer = styled.div`
  height: 5%;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: #080808;
  font-size: 16px;
  color: white;
  border-radius: 4px;
`;

const StyledChatUl = styled.ul`
  padding-left: 0;
`;
const StyledChatLi = styled.li`
  padding: 0px;
  list-style-type: none;
  :hover: {
    cursor: pointer;
  }
  display: flex;
`;

const StyledAvatarDiv = styled.div`
  flex: 0 0 20%;
`;

const StyledNewMessageIndicatorDiv = styled.div`
  flex: 0 0 10%;
`;

const StyledChatSummary = styled.div`
  flex: 0 0 80%;
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  position: relative;
  top: 12px;
  left: 2px;
  font-size: 25px;
  line-height: 25px;
  color: black;
  cursor: default;
  font-family: "Courier New", monospace;
  font-weight: bold;
  padding: 16px;
  margin-left: 2px;
`;

const StyledTextMedium = styled(TextMedium)`
  margin: 0;
  padding: 0 8px;
  cursor: default;
`;
const StyledTextSmall = styled(TextSmall)`
  margin: 0;
  padding: 0 8px;

  cursor: default;
`;

const StyledNewMessageIndicator = styled.span`
  height: 6px;
  width: 6px;
  background-color: black;
  border-radius: 50%;
  display: inline-block;
`;
export { StyledContainer, StyledButtonContainer, StyledButton, StyledChatUl, StyledChatLi, StyledAvatarDiv, StyledChatSummary, StyledSpan, StyledTextMedium, StyledTextSmall, StyledNewMessageIndicatorDiv, StyledNewMessageIndicator };
