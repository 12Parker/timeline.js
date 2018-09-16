import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Moment from './Moment/moment.js';
import Form from "./AddButton/add.js";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className = "memoriesContainer">
          <Moment />
        </div>
        <div className = "inputContainer">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
