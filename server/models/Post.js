// This model is used to store ans retrieve data from post collection
// that will be displayed/manipulated/processed and shown in the front-end

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
      },
    },
  ],
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
