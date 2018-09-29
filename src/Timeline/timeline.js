import React from "react";
import { MomentList, Moment } from "../Moment/moment.js";
import Add from "../AddButton/add.js";
import "./timeline.css";
let items = [<Moment />];

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.state = { items: items };
  }
  addItem() {
    items.unshift({
      index: items.length + 1
    });
    this.setState({ items: items });
  }
  render() {
    return (
      <div className="timeline">
        <MomentList items={items} />
        <Add addItem={this.addItem} text="Add Me" />
      </div>
    );
  }
}
