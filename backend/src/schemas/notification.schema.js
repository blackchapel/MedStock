const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["LOW STOCK"],
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
