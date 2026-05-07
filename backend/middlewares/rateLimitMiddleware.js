const rateLimit = require("express-rate-limit");


// STRICT AUTH LIMITER
const authLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 10,

  message: {
    message: "Too many login attempts"
  }

});


// GENERAL API LIMITER
const apiLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    message: "Too many requests"
  }

});

module.exports = {
  authLimiter,
  apiLimiter
};