const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  addSupplier,
  getAllSuppliers
} = require("../controllers/supplierController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addSupplier
);

router.get(
  "/",
  authMiddleware,
  getAllSuppliers
);

module.exports = router;