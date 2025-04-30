const CreditScore = require("../models/CreditScore");

exports.getCreditScores = async (req, res) => {
  try {
    const creditScores = await CreditScore.find();
    res.status(200).json(creditScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCreditScore = async (req, res) => {
  try {
    const creditScore = new CreditScore(req.body);
    await creditScore.save();
    res.status(201).json(creditScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCreditScore = async (req, res) => {
  try {
    const updatedCreditScore = await CreditScore.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCreditScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
