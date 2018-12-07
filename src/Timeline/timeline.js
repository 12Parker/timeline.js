import React from "react";
import { Moment } from "../Moment/moment.js";
import { MomentList } from "../MomentList/momentList.js";
import Add from "../AddButton/add.js";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import "./timeline.css";
let items = [];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  console.log("result0: ", startIndex, " : ", endIndex);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = { items: items, counter: 0 };
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      console.log("dragendfail");
      return;
    }
    console.log("result: ", result);
    console.log("resultSOurce: ", result.destination);
    const item = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items: item
    });
  }

  addItem(title) {
    items.push({
      id: title,
      title: title
    });
    this.setState(state => {
      return { items, counter: state.counter + 1 };
    });
  }

  removeItem(itemIndex) {
    items.splice(itemIndex, 1);
    this.setState({ items });
  }

  render() {
    return (
      <div className="col s12 m8 l9 timeline">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <List provided={provided} innerRef={provided.innerRef}>
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {provided => (
                      <Moment
                        key={item.title}
                        title={item.title}
                        item={item}
                        index={index}
                        counter={this.state.counter}
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
