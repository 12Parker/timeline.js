import React from "react";
import { Modal } from "../ImageModal/imageModal";
import "./moment.css";
import { Delete } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";

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
        <div className="display-block">
          <Modal show={this.state.show} handleClose={this.hideModal} />
        </div>
      );
    } else {
      return (
        <Draggable
          key={this.props.id}
          draggableId={this.props.id}
          index={this.props.index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
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
          )}
        </Draggable>
      );
    }
  }
}
