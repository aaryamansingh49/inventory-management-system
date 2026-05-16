const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      // console.log("REQ.USER:", req.user);
      // console.log("USER ROLE:", userRole);
      // console.log("ALLOWED ROLES:", allowedRoles);

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
};

module.exports = roleMiddleware;
