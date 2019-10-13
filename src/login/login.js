import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import { DisplayXSmall, TextXLarge, DisplayMedium } from '../Typography';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: '',
    };
  }

  render() {
    return (
      <div>
        <DisplayMedium>LogIn </DisplayMedium>

        <form onSubmit={e => this.handleFirebaseLogIn(e)}>
          <DisplayXSmall> Email</DisplayXSmall>
          <input
            id="login-email-input"
            onChange={e => this.inputHandler('email', e)}
          />
          <DisplayXSmall> Password</DisplayXSmall>
          <input
            id="login-password-input"
            onChange={e => this.inputHandler('password', e)}
          />
          <button type="submit">LOG IN </button>
        </form>

        {this.state.loginError ? (
          <TextXLarge> Incorrect email/password </TextXLarge>
        ) : null}
        <DisplayXSmall> Don't Have An Account? </DisplayXSmall>
        <Link to="signup"> Sign Up!</Link>
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
  handleFirebaseLogIn = async e => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push('/dashboard');
        },
        err => {
          console.log(err);
          this.setState({ loginError: 'LogIn Error' });
        }
      );
  };
}

export default Login;
