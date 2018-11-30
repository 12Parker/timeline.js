import React from "react";
import { Moment } from "../Moment/moment.js";
import { Draggable } from "react-beautiful-dnd";
export class MomentList extends React.Component {
  render() {
    const { provided, innerRef, children } = this.props;
    const rand = Math.random();
    let items = this.props.items.map((item, index) => {
      return (
        <div className="row">
          <Draggable draggableId={`moment${index}`} index={index}>
            {provided => (
              <Moment
                key={index}
                item={item}
                index={index}
                provided={provided}
                innerRef={provided.innerRef}
                removeItem={this.props.removeItem}
              />
            )}
          </Draggable>
          {children}
        </div>
      );
    });
    return (
      <ul
        {...provided.droppableProps}
        ref={innerRef}
        children={children}
        className="momentContainer"
      >
        {items}
      </ul>
    );
  }
}
