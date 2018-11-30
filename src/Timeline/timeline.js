import React from "react";
import { Moment } from "../Moment/moment.js";
import { MomentList } from "../MomentList/momentList.js";
import Add from "../AddButton/add.js";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import "./timeline.css";
let items = [<Moment />];

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = { items: items };
  }

  reorder = (list, startIndex, endIndex) => {
    console.log("list: ", list);
    console.log("start: ", startIndex);
    console.log("end: ", endIndex);
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  onDragEnd(result) {
    // dropped outside the list
    console.log("dragEnd");
    if (!result.destination) {
      console.log("dragEnd Failed");
      return;
    }

    const dropItem = this.reorder(
      items,
      result.source.index,
      result.destination.index
    );
    console.log("dropItem: ", dropItem);
    this.setState({
      items: dropItem
    });
  }

  addItem() {
    items.unshift({
      index: items.length + 1
    });
    this.setState({ items });
  }

  removeItem(itemIndex) {
    items.splice(itemIndex, 1);
    this.setState({ items });
  }

  render() {
    return (
      <div className="col s12 m8 l9 timeline">
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {provided => (
              <List provided={provided} innerRef={provided.innerRef}>
                {this.state.items.map((item, index) => (
                  <Draggable key={index} draggableId={`${index}`} index={0}>
                    {provided => (
                      <Moment
                        key={index}
                        item={item}
                        index={index}
                        provided={provided}
                        innerRef={provided.innerRef}
                        removeItem={this.removeItem}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
        <Add addItem={this.addItem} text="Add Moment" />
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    const { provided, innerRef, children } = this.props;
    return (
      <div {...provided.droppableProps} ref={innerRef}>
        {children}
      </div>
    );
  }
}
