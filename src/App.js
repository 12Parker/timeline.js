import React, { Component } from "react";
import "./App.css";
import Timeline from "./Timeline/timeline.js";
import Sidebar from "./Sidebar/sidebar.js";
import "typeface-roboto";
class App extends Component {
  render() {
    return (
      <div className="row App">
        <Timeline />
        <Sidebar />
      </div>
    );
  }
}

export default App;
