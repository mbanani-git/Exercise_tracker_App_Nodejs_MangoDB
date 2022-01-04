const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    maxlength: [10],
  },
  count: {
    type: Number,
    default: 0,
  },
  log: [{ description: String, date: String, duration: Number }],
});

module.exports = mongoose.model("User", UserSchema);
