const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema(
  {
    ID: {
      type: Number,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    Reward: {
      type: Boolean,
      required: true,
    },
    Value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;
