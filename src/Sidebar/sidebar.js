import React from "react";
import Gallery from "../Gallery/gallery";

import smile from "../Images/smile.png";
import "./sidebar.css";
export default class Sidebar extends React.Component {
  state = { selectedFile: null };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    console.log(this.state.selectedFile);
  };
  render() {
    return (
      <div className="col s12 m4 l3 sidebar">
        <Gallery imageUrls={[smile, smile]} />
        <input type="file" onChange={this.fileChangedHandler} />
        <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    );
  }
}
