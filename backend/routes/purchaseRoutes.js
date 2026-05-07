const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createPurchase
} = require("../controllers/purchaseController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createPurchase
);

module.exports = router;