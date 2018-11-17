import React from "react";
import { Modal } from "../ImageModal/imageModal";
import "./moment.css";
import { Delete } from "@material-ui/icons";

export class Moment extends React.Component {
  state = { show: false };
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onClickClose() {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  render() {
    if (this.state.show) {
      return (
        <div className="row">
          <Modal show={this.state.show} handleClose={this.hideModal} />
        </div>
      );
    } else {
      return (
        <div>
          <a
            className="moment btn-floating btn-small  red"
            onClick={this.showModal}
          >
            <i className="material-icons" />
          </a>
          <a onClick={this.onClickClose}>
            <Delete />
          </a>
        </div>
      );
    }
  }
}

export class MomentList extends React.Component {
  render() {
    let items = this.props.items.map((item, index) => {
      return (
        <div className="row">
          <Moment
            key={index}
            item={item}
            index={index}
            removeItem={this.props.removeItem}
          />
        </div>
      );
    });
    return <ul className="momentContainer">{items}</ul>;
  }
}
