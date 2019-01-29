import React from "react";
import axios from "axios";
import "./sidebar.css";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [], selectedFile: [], loaded: 0 };
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }
  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ pictures: res.data }));
  };

  handleselectedFile = event => {
    const eventArray = Array.from(event.target.files);
    this.setState({
      selectedFile: eventArray,
      loaded: 0
    });
  };

  handleUpload = () => {
    const data = new FormData();
    this.state.selectedFile.forEach((element, index) => {
      data.append(
        "file",
        this.state.selectedFile[index],
        this.state.selectedFile[index].name
      );
    });

    axios
      .post("api/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
  };

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  render() {
    const { pictures } = this.state;
    return (
      <div className="col s12 m4 l3 sidebar">
        {pictures.length <= 0
          ? "NO DB ENTRIES YET"
          : pictures.map(dat => (
              <div
                draggable
                onDragStart={e => this.onDragStart(e, dat.message)}
                className="imageContainer"
              >
                <img
                  onClick={this.onClick}
                  className="galleryImage"
                  src={"data:image/jpg;base64," + dat.message}
                />
              </div>
            ))}
        <div className="flex">
          <div className="upload-btn-wrapper">
            <button className="btn">Upload a file</button>
            <input
              className="button-secondary"
              type="file"
              multiple
              name=""
              id=""
              onChange={this.handleselectedFile}
            />
          </div>
          <div className="flex">
            <button className="button-secondary" onClick={this.handleUpload}>
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
