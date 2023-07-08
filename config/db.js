const mongoose = require("mongoose");
const config = require("./config");
const dbURL = config.db.url;

//DATABASE CONNECTION
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
