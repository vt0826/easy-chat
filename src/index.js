import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./login/login";
import Signup from "./signup/signup";
import Dashboard from "./dashboard/dashboard";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyAcnUmdJkcplXO93VXmQfWxekZ5oR20pIc",
  authDomain: "easy-chat-f3171.firebaseapp.com",
  databaseURL: "https://easy-chat-f3171.firebaseio.com",
  projectId: "easy-chat-f3171",
  storageBucket: "easy-chat-f3171.appspot.com",
  messagingSenderId: "857429355775",
  appId: "1:857429355775:web:a825609ef43a27967af0ca",
  measurementId: "G-B7LPSWP4ZJ"
});

const routes = (
  <Router>
    <div className="container" id="router">
      <main>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
      </main>
    </div>
  </Router>
);
ReactDOM.render(routes, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
