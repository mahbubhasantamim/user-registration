const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/authToken.model");
const { sendMail } = require("../utils/verify.mail");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    let user = await newUser.save();
    res.status(201).json({ message: "Singup successful", user: user });

    //generate verification token
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    const expirationTime = new Date(Date.now() + 3600000); // Token expires in 1 hour
    const newToken = new Token({
      userId: user._id,
      authtoken: jwtToken,
      expiresAt: expirationTime,
    });
    await newToken.save();

    sendMail(user.name, user.email, newToken.authtoken);
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
          verification: user.verification,
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
  } catch (error) {
    res.status(401).json({
      error: "Server side error" + error,
    });
  }
};

const mailVerify = async (req, res) => {
  const token = req.params.token;

  const authToken = await Token.findOne({ authtoken: token });

  try {
    if (!authToken || authToken.expiresAt < new Date()) {
      res.status(401).json({
        status: "error",
        msg: "Invalid token",
      });
    } else {
      await User.updateOne(
        {
          _id: authToken.userId,
        },
        {
          $set: {
            verification: true,
          },
        }
      );

      await Token.deleteOne({ _id: authToken._id });
      res.status(200).json({
        status: "ok",
        msg: "Verification successful",
      });
    }
  } catch (error) {
    res.status(401).json({
      error: "Server side error" + error,
    });
  }
};

module.exports = { createUser, loginUser, mailVerify };
