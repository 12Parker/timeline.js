import React from "react";
import Moment from "../Moment/moment.js";
import { DropTarget } from "react-dnd";

const momentTarget = {
  drop(props, monitor) {
    return {};
  }
};
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

class MomentList extends React.Component {
  render() {
    const { connectDropTarget } = this.props;
    let items = this.props.items.map((id, item, index) => {
      return connectDropTarget(
        <div className="row">
          <Moment
            key={id}
            item={item}
            index={index}
            removeItem={this.props.removeItem}
          />
        </div>
      );
    });
    return <ul className="momentContainer">{items}</ul>;
  }
}

export default DropTarget("moment", momentTarget, collect)(MomentList);
