const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      this.password = await bcrypt.hash(this.password, salt); // Hash the password
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
