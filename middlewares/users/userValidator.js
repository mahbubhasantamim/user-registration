const { check, validationResult, body } = require("express-validator");
const User = require("../../models/users.model");
const createError = require("http-errors");

//USER SINGUP
const userSignupValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("E-mail already in use");
        }
      } catch (error) {
        throw createError(error);
      }
    }),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password at least 5 character long!"),
  body("checkPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password don't match"),
];

//userSignupValidator
const userSignupValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  userSignupValidator,
  userSignupValidationHandler,
};
