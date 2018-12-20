import React from "react";
import "./imageModal.css";
import MomentComment from "../MomentComment/momentComment";

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { src: "" };
  }
  onDragOver = ev => {
    ev.preventDefault();
  };
  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    this.setState({ src: "data:image/jpg;base64," + id });
  };
  render() {
    let showHideClassName = this.props.show ? "display-block" : "display-none";
    return (
      <div
        style={{ wordBreak: "break-word", maxWidth: "300px" }}
        className={showHideClassName}
      >
        <div className="col">
          <div className="card blue-grey darken-1">
            <div className="card-image">
              <button
                className="cancelBtn right"
                onClick={this.props.handleClose}
              >
                X
              </button>
              <img
                ref={this.myRef}
                onDragOver={e => this.onDragOver(e)}
                onDrop={e => {
                  this.onDrop(e);
                }}
                style={{ width: "100%", height: "200px" }}
                src={this.state.src}
              />
              <span className="card-title">{this.props.title}</span>
            </div>
            <div className="card-content white-text">
              {/* {this.props.children} */}
              <MomentComment
                key={this.props.index}
                title={this.props.title}
                counter={this.props.counter}
                updateMoment={this.props.updateMoment}
                index={this.props.index}
                placeholder={{ comment: "Please add a comment." }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
