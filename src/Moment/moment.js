import React from "react";
import { Modal } from "../ImageModal/imageModal";
import "./moment.css";
import axios from "axios";
import { Delete } from "@material-ui/icons";
export class Moment extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.state = { show: true, counter: this.props.counter, colour: null };
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
    let colour =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";

    this.setState({
      colour: colour
    });
    return colour;
  }

  hideModal = () => {
    console.log("ThisModal: ", this);
    this.setState({ show: false });
  };

  onClickClose() {
    console.log("Props: ", this.props);
    let title = this.props.title;
    let index = parseInt(this.props.index);
    this.props.removeItem(index);

    axios
      .delete(
        "api/deleteMoment",
        { data: { title: title } },
        {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        }
      )
      .then(res => {
        console.log(res.statusText);
      });
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
    let momentColour = this.state.colour
      ? this.state.colour
      : this.getRandomColor();
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
            style={{ backgroundColor: momentColour }}
            className="moment btn-floating btn-small"
            onClick={this.showModal}
          >
            <i className="material-icons" />
          </a>
          <a
            style={{ position: "absolute", marginTop: "10px" }}
            onClick={this.onClickClose}
          >
            <Delete />
          </a>
        </div>
      );
    }
  }
}
