import React from "react";
import { Moment } from "../Moment/moment.js";

export class MomentList extends React.Component {
  render() {
    let items = this.props.items.map((id, item, index) => {
      return (
        <div className="row">
          <Moment
            key={id}
            item={item}
            index={index}
            ref={this.props.ref}
            removeItem={this.props.removeItem}
          />
        </div>
      );
    });
    return <ul className="momentContainer">{items}</ul>;
  }
}
