const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todo", TodoSchema);
