const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    communityId: {
      type: String,
      required: true,
    },
    communityType: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    expire_at: {
      type: Date,
      default: Date.now(),
      expires: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
