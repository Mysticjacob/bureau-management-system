const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const loanRoutes = require("./routes/loanRoutes");
const creditRoutes = require("./routes/creditRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB()
;
app.use("/transactions", transactionRoutes);
app.use("/users", userRoutes);
app.use("/loans", loanRoutes);
app.use("/creditscores", creditRoutes);

module.exports = app;
