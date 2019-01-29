import React from "react";
import { Modal } from "../ImageModal/imageModal";
import "./moment.css";
import axios from "axios";
import { Delete } from "@material-ui/icons";
export class Moment extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.state = { show: true, counter: this.props.counter };
  }

  componentDidMount() {
    const items = {
      id: this.props.title,
      title: this.props.title,
      counter: this.props.counter
    };
    axios.post("api/uploadMoment", items).then(res => {
      console.log(res.statusText);
    });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  getRandomColor() {
    return (
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")"
    );
  }

  hideModal = () => {
    console.log("ThisModal: ", this);
    this.setState({ show: false });
  };

  onClickClose() {
    let index = parseInt(this.props.index);
    this.props.removeItem(index);
  }

  momentData = data => {
    if (data) {
      this.setState({ comment: data });
      const updateMoment = {
        id: this.props.title,
        comment: data
      };
      axios.post("api/updateData", updateMoment).then(res => {
        console.log(res.statusText);
      });
    }
  };

  render() {
    const { provided, innerRef, index } = this.props;
    if (this.state.show) {
      return (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={innerRef}
          className="display-block"
        >
          <Modal
            key={this.props.title}
            title={this.props.title}
            index={index}
            counter={this.state.counter}
            updateMoment={this.momentData}
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
            style={{ backgroundColor: this.getRandomColor() }}
            className="moment btn-floating btn-small"
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
