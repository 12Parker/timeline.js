//TODO: Move to Model folder

// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const MomentSchema = new Schema(
  {
    counter: Number,
    title: String,
    comment: String,
    image: Buffer
  },
  { timestamps: true },
  { collection: "moments" }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Moment", MomentSchema);
