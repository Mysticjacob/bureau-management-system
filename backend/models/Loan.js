const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to User model
  amount: { type: Number, required: true },  // Loan amount
  status: { type: String, default: "Approved" },
  repaymentHistory: [{ 
    date: { type: Date, default: Date.now },  // Date of repayment
    amount: { type: Number, required: true },  // Repayment amount
  }],
});

module.exports = mongoose.model("Loan", LoanSchema);
