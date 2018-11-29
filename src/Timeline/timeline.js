import React from "react";
import Moment from "../Moment/moment.js";
import MomentList from "../MomentList/momentList.js";
import Add from "../AddButton/add.js";

import "./timeline.css";

let items = [<Moment />];

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = { items: items };
  }
  addItem() {
    items.unshift({
      index: items.length + 1
    });
    this.setState({ items: items });
  }
  removeItem(itemIndex) {
    items.splice(itemIndex, 1);
    this.setState({ items: items });
  }
  render() {
    return (
      <div className="col s12 m8 l9 timeline">
        <MomentList items={items} removeItem={this.removeItem} />
        <Add addItem={this.addItem} text="Add Moment" />
      </div>
    );
  }
}
