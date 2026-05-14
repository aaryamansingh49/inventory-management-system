const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const authHeader =
      req.header("Authorization");

    console.log(
      "AUTH HEADER:",
      authHeader
    );

    if (!authHeader) {

      return res.status(401).json({
        message:
          "Access denied. No token provided"
      });

    }

    // Remove Bearer
    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    console.log("TOKEN:", token);
    

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log(
      "VERIFIED USER:",
      verified
    );

    req.user = verified;

    next();

  } catch (error) {

    console.log(
      "AUTH ERROR:",
      error.message
    );

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = authMiddleware;