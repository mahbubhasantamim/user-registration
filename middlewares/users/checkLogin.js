const jwt = require("jsonwebtoken");
const createError = require("http-errors");

//check login
const checkLogin = (req, res, next) => {
  let token = req.header("Authorization");
  //"authentication"
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      if (decoded.userId) {
        req.user = decoded;
        next();
      } else {
        res.stauts(401).json({
          status: "error",
          msg: "Authentication failure",
        });
      }
    } catch (err) {
      throw createError(err);
    }
  } else {
    res.json({
      status: "error",
      msg: "Authentication failure!",
    });
  }
};

module.exports = { checkLogin };
