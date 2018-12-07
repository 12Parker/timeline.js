import React from "react";
import "./add.css";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { placeholder: "Add moment" };
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    let newItemValue = this.refs.itemName.value;
    console.log("NewVal: ", newItemValue);
    if (newItemValue) {
      this.props.addItem(newItemValue);
      this.refs.form.reset();
    }
  }
  render() {
    return (
      <form ref="form" className="addForm" onSubmit={this.onSubmit}>
        <input
          placeholder={this.state.placeholder}
          ref="itemName"
          id="addMoment"
          type="text"
          className="row"
        />
        <button type="submit" className="addButton">
          Add
        </button>
      </form>
    );
  }
}
