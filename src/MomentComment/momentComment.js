import React from "react";

export default class MomentComment extends React.Component {
  constructor(props) {
    super(props);
    this.saveChange = this.saveChange.bind(this);
    this.state = {
      edit: true,
      placeholder: this.props.placeholder.comment, // Populate props values
      [`momentComment${this.props.counter}`]: ""
    };
    console.log("construct: ", this.props.counter);
  }
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        console.log("val: ", value);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          console.log("KeyVal: ", key, " : ", value);
          this.setState({ [key]: value });
          console.log("StateNow: ", this.state);
        } catch (e) {
          // handle empty string
          console.log("StateNowFail: ", this.state);
          this.setState({ [key]: value });
        }
      }
    }
  }
  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }
  updateInputValue(e) {
    this.setState({
      [`momentComment${this.props.counter}`]: e.target.value
    });
    // update localStorage
    localStorage.setItem(
      `momentComment${this.props.counter}`,
      JSON.stringify(e.target.value)
    );
    this.props.updateMoment(this.state[`momentComment${this.props.counter}`]);
  }
  saveChange = () => {
    console.log("This: ", this);
    this.setState(state => ({
      edit: !state.edit
    }));
  };

  render() {
    let editable = this.state.edit ? false : true;
    let buttonText = this.state.edit ? "Save" : "Edit";
    return (
      <div className="row">
        <form className="col s12">
          <input
            readOnly={editable}
            placeholder={this.state.placeholder}
            id="momentComment"
            type="text"
            className="row"
            onChange={e => this.updateInputValue(e)}
            value={this.state[`momentComment${this.props.counter}`]}
          />
          <div>
            <a
              className="btn-flat waves-effect waves-light red"
              onClick={this.saveChange}
            >
              <i className="material-icons">{buttonText}</i>
            </a>
          </div>
        </form>
      </div>
    );
  }
}
