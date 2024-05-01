const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    user: {
      type: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        username: {
          type: String,
        },
        role: {
          type: String,
          enum: ["ADMIN", "USER"],
        },
      },
    },
    token: {
      type: String,
    },
    tokenType: {
      type: String,
      enum: ["BEARER"],
    },
    lastAccess: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Auth = mongoose.model("auth", authSchema);

module.exports = Auth;
