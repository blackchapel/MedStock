const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const dontenv = require("dotenv");
const database = require("./configs/database.config");

const app = express();
const PORT = 3000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

dontenv.config();
database();

app.get("/api", (req, res) => {
  res.status(200).json({
    name: `${process.env.APP_NAME}`,
    apiVersion: JSON.parse(fs.readFileSync("./package.json").toString())
      .version,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${process.env.APP_URL}`);
});
