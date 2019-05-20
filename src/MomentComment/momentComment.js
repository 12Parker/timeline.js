import React from "react";
import "./momentComment.css";

export default class MomentComment extends React.Component {
  constructor(props) {
    super(props);
    this.saveChange = this.saveChange.bind(this);
    this.state = {
      edit: true,
      placeholder: this.props.placeholder.comment, // Populate props values
      [`momentComment${this.props.title}`]: "",
      rows: 5,
      minRows: 5,
      maxRows: 10
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
    const textareaLineHeight = 24;
    const { minRows, maxRows } = this.state;

    const previousRows = e.target.rows;
    e.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    this.setState({
      rows: currentRows < maxRows ? currentRows : maxRows,
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
          <textarea
            rows={this.state.rows}
            readOnly={editable}
            placeholder={this.state.placeholder}
            id="momentComment"
            type="text"
            className="row textarea"
            onChange={e => this.updateInputValue(e)}
            value={this.state[`momentComment${this.props.title}`]}
          />
          <div>
            <a
              style={{ margin: "5px", color: "white" }}
              className="btn-flat waves-effect waves-light blue"
              onClick={this.saveChange}
            >
              <i className="material-icons modalButton">{buttonText}</i>
            </a>
          </div>
        </form>
      </div>
    );
  }
}
