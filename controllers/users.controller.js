const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Singup successful" });
  } catch (error) {
    res.status(500).json({
      message: "Signup failed" + error,
    });
  }
};

//login handler
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const userObject = {
          userId: user._id,
          email: user.email,
        };
        const token = jwt.sign(userObject, process.env.JWT_SECRET);

        //set cookie
        res
          .cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            signed: true,
          })
          .json({ status: "ok", token: token });
      } else {
        res.status(401).json({
          errors: {
            password: {
              msg: "Incorrect password",
            },
          },
        });
      }
    } else {
      res.status(401).json({
        errors: {
          email: {
            msg: "User not found",
          },
        },
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Server side error" + err,
    });
  }
};

module.exports = { createUser, loginUser };
