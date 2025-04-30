const express = require("express");
const { getCreditScores, addCreditScore, updateCreditScore } = require("../controllers/creditController");

const router = express.Router();

router.get("/", getCreditScores);
router.post("/", addCreditScore);
router.put("/:id", updateCreditScore);

module.exports = router;
//SEeYZk9EMAJvYZCF