const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb://Admin:Ttf7VHdaPHZvDxg@ds243798.mlab.com:43798/timelinejs";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(fileUpload());

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  console.log("GetData");
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;
  console.log("PutData: ", message);

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/upload", (req, res, next) => {
  let data = new Data();
  let uploadFile = req.files.file;
  console.log("Post: ", uploadFile);
  data.id = 0;
  data.message = uploadFile.data.toString("base64");
  if ((!data.id && data.id !== 0) || !data.message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });

  // const fileName = req.files.file.name;
  // uploadFile.mv(`${__dirname}/public/files/${fileName}`, function(err) {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }

  //   res.json({
  //     file: `public/${req.files.file.name}`
  //   });
  // });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

// const formData = new FormData();
// formData.append(
//   "file",
//   this.state.selectedFile,
//   this.state.selectedFile.name
// );
// console.log("FormData: ", formData);
// let uploadFile = formData.files.file;
// let data = {};
// data.message = uploadFile.data.toString("base64");
// data.id = uploadFile.name;
// console.log("Data: ", data);
