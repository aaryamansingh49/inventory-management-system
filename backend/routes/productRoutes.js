const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProductsForDropdown
} = require("../controllers/productController");

router.post("/", authMiddleware, roleMiddleware("admin"), addProduct);

router.get("/", authMiddleware, getAllProducts);
router.get("/all", authMiddleware, getAllProductsForDropdown);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProduct);

module.exports = router;
