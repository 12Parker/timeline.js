import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Timeline from "./Timeline/timeline.js";
import Sidebar from "./Sidebar/sidebar.js";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Timeline />
        <Sidebar />
      </div>
    );
  }
}

export default App;
