import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

import { DisplayXSmall, TextXLarge, DisplayMedium } from "../Typography";

// Style
import styled from "styled-components";
import { StyledContainer } from "../chatList/style";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: ""
    };
  }

  render() {
    return (
      <StyledFlexContainer>
        <DisplayMedium>LogIn </DisplayMedium>

        <StyledFlexItem>
          <StyledForm onSubmit={e => this.handleFirebaseLogIn(e)}>
            <DisplayXSmall> Email</DisplayXSmall>
            <StyledInput onChange={e => this.inputHandler("email", e)} />
            <DisplayXSmall> Password</DisplayXSmall>
            <StyledInput onChange={e => this.inputHandler("password", e)} />
            <div>
              <StyledButton type="submit">LOG IN </StyledButton>
            </div>
          </StyledForm>
        </StyledFlexItem>

        {this.state.loginError ? <TextXLarge> Incorrect email/password </TextXLarge> : null}

        <DisplayXSmall> Don't Have An Account? </DisplayXSmall>
        <Link to="signup">
          <DisplayXSmall>{"Sign Up!"} </DisplayXSmall>
        </Link>
      </StyledFlexContainer>
    );
  }

  inputHandler = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;

        deault: break;
    }
  };
  handleFirebaseLogIn = async e => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        err => {
          console.log(err);
          this.setState({ loginError: "LogIn Error" });
        }
      );
  };
}

export default Login;

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
const StyledForm = styled.form``;
const StyledInput = styled.input`
  width: 50%;
  height: 30px;
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
