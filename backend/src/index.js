const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var cron = require("node-cron");
const fs = require("fs");
const dontenv = require("dotenv");
const database = require("./configs/database.config");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const inventoryRoutes = require("./routes/inventory.route");
const notificationRoutes = require("./routes/notification.route");
const { notification } = require("./services/notification.service");

const app = express();
const PORT = 3000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

dontenv.config();
database();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/notification", notificationRoutes);

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

cron.schedule("*/10 * * * *", async () => {
  await notification();
});
