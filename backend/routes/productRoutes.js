const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  addProduct
} = require("../controllers/productController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addProduct
);

module.exports = router;