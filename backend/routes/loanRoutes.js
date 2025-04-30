const express = require("express");
const { getLoans, getLoansForUser, addLoan, updateLoan, deleteLoan, makeRepayment } = require("../controllers/loanController");

const router = express.Router();

// Get all loans
router.get("/", getLoans);

// Get loans for a specific user
router.get("/user/:userId", getLoansForUser);

// Add a loan request
router.post("/", addLoan);

// Update a loan status (for admin approval or rejection)
router.put("/:id", updateLoan);

// Delete a loan
router.delete("/:id", deleteLoan);

// Make a repayment on a loan
router.post("/:loanId/repayment", makeRepayment);

module.exports = router;
