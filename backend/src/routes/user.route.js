const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", auth.verifyJwt, getUser);

router.put("/", auth.verifyJwt, updateUser);

router.delete("/", auth.verifyJwt, deleteUser);

module.exports = router;
