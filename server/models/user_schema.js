const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username field is required"],
    },
    password: {
      type: String,
      required: [true, "password field is required"],
    },
    email: {
      type: String,
      required: [true, "email field is required"],
    },
    emailValidation: {
      isValidated: Boolean,
      validationKey: String,
    },
    avatar: { type: Number, default: 1 },
    team: {
      type: [{ pokemon: String, moves: [String] }],
      default: [],
    },
    score: {
      victories: { type: Number, default: 0 },
      defeats: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);
