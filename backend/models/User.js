const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password:{ type:String, unique: true, required: true },
  creditScore: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
