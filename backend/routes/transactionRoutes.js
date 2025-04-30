const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// POST a new transaction (for loan payments or loan requests)
router.post("/", async (req, res) => {
  try {
    const { userId, loanId, amount, type } = req.body;
    const newTransaction = new Transaction({
      userId,
      loanId,
      amount,
      type,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating transaction" });
  }
});

// GET all transactions for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

module.exports = router;
