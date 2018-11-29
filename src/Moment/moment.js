import React from "react";
import { Modal } from "../ImageModal/imageModal";
import "./moment.css";
import { Delete } from "@material-ui/icons";
import { ItemTypes } from "../Constants/constants";
import { DragSource } from "react-dnd";

const momentSource = {
  beginDrag(props) {
    console.log("begin dragging moment", props);
    return {};
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class Moment extends React.Component {
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
    const { isDragging, connectDragSource } = this.props;
    if (this.state.show) {
      return (
        <div className="display-block">
          <Modal show={this.state.show} handleClose={this.hideModal} />
        </div>
      );
    } else {
      return connectDragSource(
        <div
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: "bold",
            cursor: "move"
          }}
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

export default DragSource("moment", momentSource, collect)(Moment);
