const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  getInventory,
  getAllInventory,
  addInventory,
  deleteInventory,
  updateInventory,
} = require("../controllers/inventory.controller");

const router = express.Router();

router.get("/all", auth.verifyJwt, getAllInventory);

router.get("/:id", auth.verifyJwt, getInventory);

router.post("/", auth.verifyJwt, addInventory);

router.put("/:id", auth.verifyJwt, updateInventory);

router.delete("/:id", auth.verifyJwt, deleteInventory);

module.exports = router;
