import React, { useState } from "react";
import "./App.css";
import MainPage from "./MainPage";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "typeface-roboto";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_USER = gql`
  {
    user(_id: "5cc8f22da02143498442c0e6") {
      password
    }
  }
`;

// const isAuth = {
//   isAuthenticated: false,
//   authenticate() {
//     axios
//       .get("loggedIn")
//       .then(res => {
//         this.isAuthenticated = res.data;
//         console.log("Auth: ", this.isAuthenticated);
//       })
//       .catch(err => {
//         this.isAuthenticated = false;
//       });
//   }
// };
function App() {
  const [isLoggedIn, login] = useState(false);
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) return <p>Loading...</p>;
  return (
    <Router>
      <PrivateRoute
        exact
        path="/"
        component={MainPage}
        isLoggedIn={isLoggedIn}
      />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
