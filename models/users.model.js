const { default: mongoose } = require("mongoose");

require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verification: { type: Boolean, enum: [true, false], default: false },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

//create model
module.exports = new mongoose.model("User", userSchema);
