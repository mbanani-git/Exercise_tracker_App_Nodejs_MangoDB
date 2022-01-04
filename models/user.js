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
  log: {
    type: Array,
    default: {
      description: {
        type: String,

        trim: true,
        maxlength: [20],
      },
      duration: {
        type: Number,

        maxlength: [3],
      },
      description: {
        type: Date,
      },
    },
  },
});

module.exports = mongoose.model("User", UserSchema);
