import React from "react";
import axios from "axios";
import passport from "passport";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // process the signup form
  handleSubmit(event) {
    console.log("Event: ", this.state);
    axios
      .post("/signup", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.setState({
          //redirect to login page
          redirect: "true"
        });
      })
      .catch(err => {
        console.log("Err: ", err);
      });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <form>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <input type="button" onClick={this.handleSubmit} value="Submit" />
      </form>
    );
  }
}
