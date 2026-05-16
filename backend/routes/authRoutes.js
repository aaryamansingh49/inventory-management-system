const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
  });
});


module.exports = router;
