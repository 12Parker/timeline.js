import React from "react";
import "./imageModal.css";
import MomentComment from "../MomentComment/momentComment";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
console.log("GQL", graphql);
//Mutation
const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: ID!, $data: String!) {
    updateImage(id: $id, data: $data) {
      Data
    }
  }
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { src: "", [`momentImage${this.props.title}`]: "" };
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    const items = {
      id: this.props.title,
      data: this.state[`momentImage${this.props.title}`],
    };

    this.setState({
      [`momentImage${this.props.title}`]: "data:image/jpg;base64," + id,
    });

    localStorage.setItem(
      `momentImage${this.props.title}`,
      JSON.stringify("data:image/jpg;base64," + id)
    );

    this.props.mutate({
      variables: {
        id: items.id,
        data: items.data,
      },
    });

    // axios.post("api/updateImage", items).then((res) => {
    //   console.log(res.statusText);
    // });
    //Use items to populate the mutation: items.id / items.data
  };

  render() {
    let showHideClassName = this.props.show ? "display-block" : "display-none";
    return (
      <div
        style={{ wordBreak: "break-word", maxWidth: "300px" }}
        className={showHideClassName}
      >
        <div className="col">
          <div className="card blue-grey darken-1">
            <div style={{ position: "relative" }} className="card-image">
              <button
                style={{
                  position: "absolute",
                  opacity: "95",
                  zIndex: 1,
                  top: "0",
                  right: "0",
                  color: "white",
                }}
                className="cancelBtn right"
                onClick={this.props.handleClose}
              >
                X
              </button>
              <img
                ref={this.myRef}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => {
                  this.onDrop(e);
                }}
                style={{ width: "100%", height: "200px" }}
                src={this.state[`momentImage${this.props.title}`]}
              />
              <span className="card-title">{this.props.title}</span>
            </div>
            <div className="card-content white-text">
              <MomentComment
                key={this.props.index}
                title={this.props.title}
                counter={this.props.counter}
                updateMoment={this.props.updateMoment}
                index={this.props.index}
                placeholder={{ comment: "Please add a comment." }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(UPDATE_IMAGE)(Modal);
