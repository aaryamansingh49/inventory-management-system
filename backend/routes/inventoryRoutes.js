const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middlewares/authMiddleware");

const {
  getInventoryHistory
} = require("../controllers/inventoryController");


router.get(
  "/history",
  authMiddleware,
  getInventoryHistory
);

module.exports = router;