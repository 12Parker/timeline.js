import React from "react";

export default class MomentComment extends React.Component {
  state = {
    edit: true,
    momentComment: this.props.momentComment.comment // Populate props values
  };

  handleChange = () => {
    this.setState(state => ({
      edit: !state.edit
    }));
  };

  saveChange = () => {
    this.setState(() => ({
      edit: false
    }));
  };

  render() {
    if (!this.state.edit) {
      return (
        <div className="row input-field">
          <div>{this.state.momentComment}</div>
          <button onClick={this.handleChange}>Edit</button>
        </div>
      );
    } else {
      return (
        <div className="row">
          <form className="col s12">
            <input
              placeholder={this.state.momentComment}
              id="momentComment"
              type="text"
              className="row"
              onChange={e => this.setState({ momentComment: e.target.value })}
            />
            <div>
              <a
                className="btn-flat waves-effect waves-light red"
                onClick={this.saveChange}
              >
                <i className="material-icons addButton">Save</i>
              </a>
            </div>
          </form>
        </div>
      );
    }
  }
}
