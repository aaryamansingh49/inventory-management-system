const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  getAllCategories,
  addCategory
} = require("../controllers/categoryController");


// GET categories
router.get(
  "/",
  authMiddleware,
  getAllCategories
);


// ADD category
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addCategory
);

module.exports = router;