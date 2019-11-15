import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

// Style
import styled from "styled-components";
import { DisplayXSmall, TextXLarge, DisplayMedium } from "../Typography";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      signupError: ""
    };
  }

  render() {
    return (
      <StyledWrapper>
        <StyledFlexContainer>
          <StyledFlexItem>
            <DisplayMedium>SignUp </DisplayMedium>
          </StyledFlexItem>
          <StyledFlexItem>
            <form onSubmit={e => this.handleFirebaseSignup(e)}>
              <DisplayXSmall> Email</DisplayXSmall>
              <StyledInput id="sign-email-input" onChange={e => this.inputHandler("email", e)} />
              <DisplayXSmall> Password</DisplayXSmall>
              <StyledInput id="sign-email-input" onChange={e => this.inputHandler("password", e)} />
              <div>
                <StyledButton>Submit </StyledButton>
              </div>
            </form>
          </StyledFlexItem>

          {this.state.signupError ? <TextXLarge> {this.state.signupError}</TextXLarge> : null}
          <StyledFlexItem>
            <DisplayXSmall> Already Have An Account? </DisplayXSmall>
            <Link to="login"> Log In!</Link>
          </StyledFlexItem>
        </StyledFlexContainer>
      </StyledWrapper>
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
  handleFirebaseSignup = e => {
    e.preventDefault();
    console.log("submmit user info to firebase");

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        authRes => {
          const userObj = {
            email: authRes.user.email
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                this.props.history.push("/dashboard");
              },
              dbError => {
                console.log(dbError);
                this.setState({ singupError: "Sing Up Failed" });
              }
            );
        },
        authError => {
          console.log(authError);
          this.setState({ singupError: "Sing Up Failed" });
        }
      );
  };
}

export default Signup;
const StyledWrapper = styled.div`
  .container {
    margin-right: auto;
    margin-left: auto;
    max-width: 1080px;
    padding-right: 10px;
    padding-left: 10px;
  }
`;
const StyledFlexContainer = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  justify-content: center;
`;
const StyledFlexItem = styled.div`
  padding: 5px;
  flex: 0 0 100%;
  margin-top: 10px;
  text-align: center;
`;
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
