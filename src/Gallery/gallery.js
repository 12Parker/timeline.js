import React from "react";
import "./gallery.css";
export default class Gallery extends React.Component {
  renderImage(imageUrl) {
    return (
      <img key={imageUrl.toString()} className="galleryImage" src={imageUrl} />
    );
  }

  render() {
    return (
      <div className="col gallery">
        <div className=" col imageContainer">
          {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
        </div>
      </div>
    );
  }
}
