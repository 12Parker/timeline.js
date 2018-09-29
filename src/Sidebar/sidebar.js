import React from "react";
import Gallery from "../Gallery/gallery";
import Add from "../AddButton/add.js";

import smile from "../Images/smile.png";
import "./sidebar.css";
export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <Gallery imageUrls={[smile]} />
        <Add addItem={this.addItem} text="Add Image" />
      </div>
    );
  }
}
