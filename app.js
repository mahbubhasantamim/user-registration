//EXTERNAL IMPORT
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//INTERNAL IMPORT
require("./config/db");
const userRouter = require("./routes/users.route");

app.use(cors());

//handle form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//set static folder
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send("Home route");
});

app.use(userRouter);

module.exports = app;
