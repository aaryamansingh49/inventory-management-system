const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  createPurchase,
  getPurchaseHistory
} = require("../controllers/purchaseController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createPurchase
);

router.get(
  "/history",
  authMiddleware,
  getPurchaseHistory
);

module.exports = router;