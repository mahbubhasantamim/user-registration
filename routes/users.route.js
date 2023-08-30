//external import
const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  mailVerify,
} = require("../controllers/users.controller");
const {
  userSignupValidator,
  userSignupValidationHandler,
} = require("../middlewares/users/userValidator");
const { checkLogin } = require("../middlewares/users/checkLogin");
const isEmailVerify = require("../middlewares/isEmailVerify");

// router.get("/api/signup", (req, res) => {
//   res.send("Get post");
// });
router.post(
  "/api/signup",
  userSignupValidator,
  userSignupValidationHandler,
  createUser
);
router.post("/api/signin", loginUser);

router.get("/api/home", checkLogin, (req, res) => {
  res.json({
    status: "ok",
    msg: "Home page",
    user: req.user,
  });
});

router.get("/api/verify/:token", mailVerify);
module.exports = router;
