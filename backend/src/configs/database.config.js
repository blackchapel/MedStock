const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const database = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};

module.exports = database;
