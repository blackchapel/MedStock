const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  getAllNotifications,
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/all", auth.verifyJwt, getAllNotifications);

module.exports = router;
