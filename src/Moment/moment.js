import React from "react";
import { Modal } from "../ImageModal/imageModal";
import "./moment.css";
export class Moment extends React.Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    if (this.state.show) {
      return (
        <div className="row">
          <Modal show={this.state.show} handleClose={this.hideModal} />
        </div>
      );
    } else {
      return (
        <div className="row">
          <a
            className="moment btn-floating btn-small  red"
            onClick={this.showModal}
          >
            <i className="material-icons" />
          </a>
        </div>
      );
    }
  }
}

export class MomentList extends React.Component {
  render() {
    let items = this.props.items.map((item, index) => {
      return <Moment key={index} item={item} index={index} />;
    });
    return <ul className="momentContainer">{items}</ul>;
  }
}
