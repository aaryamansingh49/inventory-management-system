const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// router.get("/test", (req, res) => {
//   res.send("Auth route working");
// });

module.exports = router;
