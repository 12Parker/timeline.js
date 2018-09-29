import React from "react";
import "./gallery.css";
export default class Gallery extends React.Component {
  renderImage(imageUrl) {
    return <img className="galleryImage" src={imageUrl} />;
  }

  render() {
    return (
      <div className="gallery">
        <div className="imageContainer">
          {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
        </div>
      </div>
    );
  }
}
