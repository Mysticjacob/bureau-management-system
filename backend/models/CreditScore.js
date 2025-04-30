const mongoose = require("mongoose");

const CreditScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  history: [{ date: Date, score: Number }],
});

module.exports = mongoose.model("CreditScore", CreditScoreSchema);
