import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

// Style
import { DisplayXSmall, TextXLarge, DisplayMedium } from '../Typography';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      signupError: '',
    };
  }

  render() {
    return (
      <div>
        <DisplayMedium>SignUp </DisplayMedium>

        <form onSubmit={e => this.handleFirebaseSignup(e)}>
          <DisplayXSmall> Email</DisplayXSmall>
          <input
            id="sign-email-input"
            onChange={e => this.inputHandler('email', e)}
          />
          <DisplayXSmall> Password</DisplayXSmall>
          <input
            id="sign-email-input"
            onChange={e => this.inputHandler('password', e)}
          />
          <button>Subbmit </button>
        </form>

        {this.state.signupError ? (
          <TextXLarge> {this.state.signupError}</TextXLarge>
        ) : null}
        <DisplayXSmall> Already Have An Account? </DisplayXSmall>
        <Link to="login"> Log In!</Link>
      </div>
    );
  }

  inputHandler = (type, e) => {
    switch (type) {
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;

        deault: break;
    }
  };
  handleFirebaseSignup = e => {
    e.preventDefault();
    console.log('submmit user info to firebase');

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        authRes => {
          const userObj = {
            email: authRes.user.email,
          };
          firebase
            .firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                this.props.history.push('/dashboard');
              },
              dbError => {
                console.log(dbError);
                this.setState({ singupError: 'Sing Up Failed' });
              }
            );
        },
        authError => {
          console.log(authError);
          this.setState({ singupError: 'Sing Up Failed' });
        }
      );
  };
}

export default Signup;
/*
 *<DisplayMedium>New Account</DisplayMedium>
            <StyledForm as="form" onSubmit={this.handleFirebaseSignup}>
              <StyledDisplayXSmall className="inputLabel">
                Email
              </StyledDisplayXSmall>
              <StyledInput
                as="input"
                type="text"
                name="email"
                placeholder=""
                onChange={this.handleInputChange}
              />

              <StyledDisplayXSmall className="inputLabel">
                Password
              </StyledDisplayXSmall>
              <StyledInput
                as="input"
                type="password"
                name="password"
                placeholder=""
                onChange={this.handleInputChange}
              />

              <StyledDisplayXSmall className="inputLabel">
                Display Name
              </StyledDisplayXSmall>
              <StyledInput
                as="input"
                name="displayname"
                placeholder=""
                onChange={this.handleInputChange}
              />

              <StyledSubmitButton as="button">
                Create Account
              </StyledSubmitButton>
            </StyledForm>
*/
