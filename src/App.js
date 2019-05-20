import React, { Component } from "react";
import "./App.css";
import MainPage from "./MainPage";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "typeface-roboto";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }
  componentDidMount() {
    isAuth.authenticate();
    const isLoggedIn = isAuth.isAuthenticated;
    this.setState({ isLoggedIn: isLoggedIn });
  }

  render() {
    return (
      <Router>
        <PrivateRoute
          exact
          path="/"
          component={MainPage}
          isLoggedIn={this.state.isLoggedIn}
        />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

const isAuth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  }
};

// authenticate() {
//   axios
//     .get("loggedIn")
//     .then(res => {
//        this.isAuthenticated = res.data;
//       console.log("Auth: ", this.isAuthenticated);
//     })
//     .catch(err => {
//        this.isAuthenticated = false;
//     });
// }

export default App;
