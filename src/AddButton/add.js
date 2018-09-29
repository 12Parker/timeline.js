import React from "react";
import material from "materialize-css";
import "./add.css";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.onAddBtnClick = this.onAddBtnClick.bind(this);
  }
  onAddBtnClick(event) {
    this.props.addItem();
  }
  render() {
    return (
      <div>
        <a
          className="btn-flat waves-effect waves-light red"
          onClick={this.onAddBtnClick}
        >
          <i className="material-icons addButton">{this.props.text}</i>
        </a>
      </div>
    );
  }
}
