const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const API_PORT = 3001;
const app = express();
app.use(bodyParser.json({ limit: "5mb" }));
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/";

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
require("../config/passportFunctions")(passport); // pass passport for configuration

//TODO MAY 27th: Add mutation to login page (end -> end test)

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

const server = new ApolloServer({
  typeDefs: null,
  resolvers: null,
  schema,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app, path: "/graphql" });

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
