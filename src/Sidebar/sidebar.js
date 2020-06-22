import React, { useState, useEffect } from "react";
import { Delete } from "@material-ui/icons";
import "./sidebar.css";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

//Mutation
const DELETE_DATA = gql`
  mutation DeleteData($name: String!) {
    deleteData(name: $name) {
      id
      name
      message
    }
  }
`;

const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: [File]) {
    uploadImage(file: $file) {
      id
      name
      message
    }
  }
`;

const GET_DATA = gql`
  query GetData {
    getData {
      id
      name
      message
    }
  }
`;

const Sidebar = (props) => {
  const [pictures, setPictures] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const [uploadCount, setUploadCount] = useState(0);
  const [selectText, setText] = useState("Select File");
  const [intervalIsSet, setInterval] = useState(true);
  const [uploadImage] = useMutation(UPLOAD_IMAGE, {
    refetchQueries: GET_DATA,
  });
  const [deleteData] = useMutation(DELETE_DATA);
  const { loading, error, data } = useQuery(GET_DATA);

  const handleselectedFile = (event) => {
    const eventArray = Array.from(event.target.files);
    console.log("SelectedCount: ", eventArray.length);
    console.log("SelectedFile: ", eventArray);
    setSelectedFile(eventArray);
    setUploadCount(eventArray.length);
    setLoaded(0);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async () => {
    const data = new FormData();
    selectedFile.forEach((_, index) => {
      data.append("file", selectedFile[index], selectedFile[index].name);
    });
    let arrayData = [];
    for (const [index, element] of data) {
      const res = await toBase64(element);
      const upload = {
        title: index,
        name: element.name,
        data: res,
      };
      arrayData.push(upload);
    }

    console.log("arr: ", arrayData);
    console.log("arr: ", arrayData.length);
    if (arrayData.length > 0) {
      return uploadImage({ variables: { file: arrayData } });
    }
    setText("Select File");
    return;
  };

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  const onButtonClick = async (data) => {
    const name = data.name;
    console.log("Data: ", data);
    deleteData({ variables: { name } });
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  useEffect(() => {
    console.log("Effect data");
    if (data) {
      if (data.getData) {
        setPictures(data.getData);
      }
    }
  });

  useEffect(() => {
    console.log("Effect upload");

    uploadCount > 0
      ? setText(uploadCount + " File(s) Selected")
      : setText("Select Files");
  });

  // never let a process live forever
  // always kill a process everytime we are done using it
  useEffect(() => {
    console.log("Effect interval");

    if (intervalIsSet) {
      clearInterval(intervalIsSet);
      setInterval(null);
    }
  });

  if (loading) return "Loading...";
  return (
    <div className="col s12 m4 l3 sidebar">
      {pictures && pictures.length <= 0 ? (
        <div style={{ margin: "10px" }}>No Photos Uploaded Yet</div>
      ) : (
        pictures.map((dat) => (
          <div
            draggable
            style={{ position: "relative" }}
            key={dat._id}
            onDragStart={(e) => onDragStart(e, dat.message)}
            className="imageContainer"
          >
            <a
              style={{
                position: "absolute",
                opacity: "95",
                zIndex: 1,
                top: "0",
                right: "0",
              }}
              onClick={(e) => onButtonClick(dat)}
            >
              <Delete />
            </a>
            <img className="galleryImage" src={dat.message} />
          </div>
        ))
      )}
      <div className="flex">
        <div className="upload-btn-wrapper">
          <button className="btn">{selectText}</button>
          <input
            className="button-secondary"
            type="file"
            multiple
            name=""
            id=""
            onChange={(event) => handleselectedFile(event)}
          />
        </div>
        <div className="flex">
          <button className="button-secondary" onClick={() => handleUpload()}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
