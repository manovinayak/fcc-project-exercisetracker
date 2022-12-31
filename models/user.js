let mongoose = require("mongoose");
const { Schema } = require("mongoose");

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: "Exercise",
  }],
});

module.exports = mongoose.model("User", userSchema);
