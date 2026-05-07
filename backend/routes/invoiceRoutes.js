const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  generateInvoice
} = require("../controllers/invoiceController");

router.get(
  "/:orderId",
  authMiddleware,
  generateInvoice
);

module.exports = router;