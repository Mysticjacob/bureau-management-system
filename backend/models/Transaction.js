const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan" }, // optional for loan request
    amount: { type: Number, required: true },
    type: { type: String, enum: ["payment", "loan request"], required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
