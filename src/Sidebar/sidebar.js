import React from "react";
import axios from "axios";
import { Delete } from "@material-ui/icons";
import "./sidebar.css";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [], selectedFile: [], loaded: 0, uploadCount: 0 };
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  async componentDidMount() {
    await this.getDataFromDb();
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
    console.log("SelectedCount: ", eventArray.length);
    this.setState({
      selectedFile: eventArray,
      uploadCount: eventArray.length,
      loaded: 0
    });
  };

  handleUpload = async () => {
    const data = new FormData();
    this.state.selectedFile.forEach((element, index) => {
      data.append(
        "file",
        this.state.selectedFile[index],
        this.state.selectedFile[index].name
      );
    });

    await axios
      .post("api/uploadImage", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });

    await this.getDataFromDb();
  };

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  onClick = async data => {
    const name = data.name;
    console.log("Data: ", data);
    await axios
      .delete(
        "api/deleteData",
        { data: { name: name } },
        {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          }
        }
      )
      .then(res => {
        console.log(res.statusText);
      });

    await this.getDataFromDb();
  };

  render() {
    const { pictures } = this.state;
    let selectText =
      this.state.uploadCount > 0
        ? this.state.uploadCount + " File(s) Selected"
        : "Select Files";

    return (
      <div className="col s12 m4 l3 sidebar">
        {pictures.length <= 0
          ? "No Photos Uploaded Yet"
          : pictures.map(dat => (
              <div
                draggable
                key={dat._id}
                onDragStart={e => this.onDragStart(e, dat.message)}
                className="imageContainer"
              >
                <img
                  className="galleryImage"
                  src={"data:image/jpg;base64," + dat.message}
                />
                <a onClick={e => this.onClick(dat)}>
                  <Delete />
                </a>
              </div>
            ))}
        <div className="flex">
          <div className="upload-btn-wrapper">
            <button className="btn">{selectText}</button>
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
