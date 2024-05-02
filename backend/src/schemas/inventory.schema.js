const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfStrips: {
      type: Number,
      required: true,
    },
    numberOfUnitsPerStrip: {
      type: Number,
      required: true,
    },
    totalNumberOfUnits: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
      enum: ["DAILY", "ALTERNATE DAYS", "WEEKLY"],
    },
    numberOfUnitsPerDay: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    notificationPeriod: {
      type: Number,
      required: true,
    },
    stockOverDate: {
      type: Date,
      required: true,
    },
    notificationDateAndTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;
