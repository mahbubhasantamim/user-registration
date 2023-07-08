//external import
const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/users.controller");
const {
  userSignupValidator,
  userSignupValidationHandler,
} = require("../middlewares/users/userValidator");

router.get("/api/signup", (req, res) => {
  res.send("Get post");
});
router.post(
  "/api/signup",
  userSignupValidator,
  userSignupValidationHandler,
  createUser
);
router.post("/api/signin", loginUser);

module.exports = router;
