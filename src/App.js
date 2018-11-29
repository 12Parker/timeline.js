import React, { Component } from "react";
import "./App.css";
import Timeline from "./Timeline/timeline.js";
import Sidebar from "./Sidebar/sidebar.js";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "typeface-roboto";
class App extends Component {
  render() {
    return (
      <div className="row App">
        <DragDropContextProvider backend={HTML5Backend}>
          <Timeline />
        </DragDropContextProvider>
        <Sidebar />
      </div>
    );
  }
}

export default App;
