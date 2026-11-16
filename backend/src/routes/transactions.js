import { Router } from "express";
import { getTransactions } from "../db/transactions.js";
import { getTransactionTypes } from "../db/transactionTypes.js";

const router = Router();

router.get("/", async (req, res) => {
  const transactions = await getTransactions();
  res.json(transactions);
});

router.get("/types", async (req, res) => {
  const transactionTypes = await getTransactionTypes();
  res.json(transactionTypes);
});

export default router;
