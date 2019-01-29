import React from "react";

export default class MomentComment extends React.Component {
  constructor(props) {
    super(props);
    this.saveChange = this.saveChange.bind(this);
    this.state = {
      edit: true,
      placeholder: this.props.placeholder.comment, // Populate props values
      [`momentComment${this.props.title}`]: ""
    };
  }

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
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

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  updateInputValue(e) {
    this.setState({
      [`momentComment${this.props.title}`]: e.target.value
    });
  }

  saveChange = () => {
    localStorage.setItem(
      `momentComment${this.props.title}`,
      JSON.stringify(this.state[`momentComment${this.props.title}`])
    );
    this.props.updateMoment(this.state[`momentComment${this.props.title}`]);
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
            value={this.state[`momentComment${this.props.title}`]}
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
