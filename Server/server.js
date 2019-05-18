const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const Moment = require("./moments");
const cors = require("cors");
const passport = require("passport");
const flash = require("connect-flash");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const fileUpload = require("express-fileupload");
const API_PORT = 3001;
const app = express();
const router = express.Router();
require("custom-env").env();
// this is our MongoDB database
const dbRoute = process.env.REACT_APP_MONGO_ROUTE;
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

require("../config/passport")(passport); // pass passport for configuration

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(fileUpload());

app.set("views", "../src/Views/");
app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(session({ secret: "ilovescotchscotchyscotchscotch" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  console.log("GetData");
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/uploadImage", (req, res) => {
  let error = null;
  let data = new Data();
  let arrayData = [];
  let uploadFile = req.files.file;
  console.log("Post: ", uploadFile);

  if (uploadFile && uploadFile.constructor === Array) {
    uploadFile.forEach((element, index) => {
      console.log("Element: ", element.name);
      data.id = index;
      data.name = element.name;
      data.message = element.data.toString("base64");
      arrayData.push(data);
      console.log("IDForEach: ", arrayData[index].name);
      if ((!data.id && data.id !== 0) || !data.message) {
        return res.json({
          success: false,
          error: "INVALID INPUTS"
        });
      }
      data = {};
    });
  } else if (uploadFile) {
    data.id = 0;
    data.name = uploadFile.name;
    data.message = uploadFile.data.toString("base64");
    arrayData.push(data);
    console.log("IDForEach: ", arrayData[0].name);
    if ((!data.id && data.id !== 0) || !data.message) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
  }
  Data.insertMany(arrayData, (err, saved) => {
    // console.log("Saving: ", arrayData);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, comment } = req.body;
  const query = {
    title: id
  };
  const update = {
    comment: comment
  };
  console.log("Update: ", query, " : ", update);
  Moment.findOneAndUpdate(
    query,
    update,
    { upsert: true, new: true, runValidators: true }, // options
    function(err, doc) {
      // callback
      if (err) {
        // handle error
      } else {
        console.log("Doc: ", doc);
        // handle document
      }
    },
    err => {
      if (err) return res.json({ success: false, error: err });
      console.log("success");
      return res.json({ success: true });
    }
  );
});

// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { name } = req.body;
  Data.findOneAndDelete({ name: name }, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/updateImage", (req, res) => {
  const { id, data } = req.body;
  const query = {
    title: id
  };

  const update = {
    image: data
  };
  console.log("Update Image: ", query, " : ", update);
  Moment.findOneAndUpdate(
    query,
    update,
    { upsert: true, new: true, runValidators: true }, // options
    function(err, doc) {
      // callback
      if (err) {
        // handle error
      } else {
        console.log("Doc: ", doc);
        // handle document
      }
    },
    err => {
      if (err) return res.json({ success: false, error: err });
      console.log("success");
      return res.json({ success: true });
    }
  );
});

router.post("/uploadMoment", (req, res) => {
  let momentsToUpload = new Moment();
  let momentReq = req.body;

  console.log("Req: ", momentReq);
  if (!momentReq.id || !momentReq) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  momentsToUpload.counter = momentReq.counter;
  momentsToUpload.title = momentReq.title;
  momentsToUpload.comment = "";
  momentsToUpload.image = "";
  console.log("MomentReq: ", momentsToUpload);
  momentsToUpload.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/updateMoment", (req, res) => {
  let momentsToUpload = new Moment();
  let momentReq = req.body;
  console.log("Req: ", momentReq);
  if (!momentReq.id || !momentReq) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  momentsToUpload.counter = momentReq.counter;
  momentsToUpload.title = momentReq.title;
  momentsToUpload.comment = "";
  console.log("MomentReq: ", momentsToUpload);
  momentsToUpload.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteMoment", (req, res) => {
  const { title } = req.body;
  Moment.findOneAndDelete({ title: title }, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// routes ======================================================================
require("./routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
