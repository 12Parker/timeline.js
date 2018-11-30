import React from "react";

export default class MomentComment extends React.Component {
  constructor(props) {
    console.log("construct");
    super(props);
    this.saveChange = this.saveChange.bind(this);
    this.state = {
      edit: true,
      placeholder: this.props.placeholder.comment, // Populate props values
      momentComment: ""
    };
  }
  updateInputValue(e) {
    this.setState({
      momentComment: e.target.value
    });
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
            value={this.state.momentComment}
          />
          <div>
            <a
              className="btn-flat waves-effect waves-light red"
              onClick={this.saveChange}
            >
              <i className="material-icons addButton">{buttonText}</i>
            </a>
          </div>
        </form>
      </div>
    );
  }
}
