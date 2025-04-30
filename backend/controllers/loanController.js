const Loan = require("../models/Loan");

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("userId");
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLoansForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const loans = await Loan.find({ userId }).populate("userId");
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addLoan = async (req, res) => {
  try {
    const loanData = { ...req.body, status: "Approved" };  // Always approve
    const loan = new Loan(loanData);
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Loan deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.makeRepayment = async (req, res) => {
  const { loanId } = req.params;
  const { amount } = req.body;

  try {
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found." });
    }

    loan.repaymentHistory.push({ amount, date: new Date() });

    loan.balance -= amount;
    if (loan.balance <= 0) {
      loan.status = "Paid";
    }

    await loan.save();

    res.status(200).json({ message: "Repayment successful", loan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
