import React from "react";
import axios from "axios";
import "./sidebar.css";
import { element } from "prop-types";

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
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
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

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (picture, e) => {
    //currently not used, delete later maybe
    const files = Array.from(picture.target.files);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    let currentIds = this.state.pictures.map(pictures => pictures.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    console.log("Data; ", idToBeAdded, ":", picture[0].name);
    axios.post("/api/putData", {
      id: idToBeAdded,
      message: picture[0].name
    });
  };

  handleselectedFile = event => {
    const eventArray = Array.from(event.target.files);
    console.log("EventArray: ", eventArray);
    this.setState({
      selectedFile: eventArray,
      loaded: 0
    });
  };
  handleUpload = () => {
    console.log("State: ", this.state);
    const data = new FormData();
    console.log("InitData: ", data);
    this.state.selectedFile.forEach((element, index) => {
      data.append(
        "file",
        this.state.selectedFile[index],
        this.state.selectedFile[index].name
      );
    });
    console.log("Data: ", data);

    // let currentIds = this.state.pictures.map(pictures => pictures.id);
    // let idToBeAdded = 0;
    // while (currentIds.includes(idToBeAdded)) {
    //   ++idToBeAdded;
    // }
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

  render() {
    const { pictures } = this.state;
    return (
      <div className="col s12 m4 l3 sidebar">
        {pictures.length <= 0
          ? "NO DB ENTRIES YET"
          : pictures.map(dat => (
              <div className="imageContainer">
                <img
                  className="galleryImage"
                  src={"data:image/jpg;base64," + dat.message}
                />
              </div>
            ))}
        <div>
          <input
            type="file"
            multiple
            name=""
            id=""
            onChange={this.handleselectedFile}
          />
          <button onClick={this.handleUpload}>Upload</button>
          <div> {Math.round(this.state.loaded, 2)} %</div>
        </div>
      </div>
    );
  }
}
