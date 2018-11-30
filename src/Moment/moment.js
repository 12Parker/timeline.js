import React from "react";
import { Modal } from "../ImageModal/imageModal";
import "./moment.css";
import { Delete } from "@material-ui/icons";

export class Moment extends React.Component {
  state = { show: true };
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    console.log("ThisModal: ", this);
    this.setState({ show: false });
  };

  onClickClose() {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }

  render() {
    const { provided, innerRef } = this.props;
    if (this.state.show) {
      return (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={innerRef}
          className="display-block"
        >
          <Modal
            key={this.props.index}
            show={this.state.show}
            handleClose={this.hideModal}
          />
        </div>
      );
    } else {
      return (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={innerRef}
        >
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
