import React from "react";
import { Moment } from "../Moment/moment.js";
import { MomentList } from "../MomentList/momentList.js";
import Add from "../AddButton/add.js";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import "./timeline.css";

let items = [<Moment />];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
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
    this.state = { items: items };
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <MomentList
                ref={provided.innerRef}
                items={items}
                removeItem={this.removeItem}
              />
            )}
            ;
          </Droppable>
        </DragDropContext>
        <Add addItem={this.addItem} text="Add Moment" />
      </div>
    );
  }
}
