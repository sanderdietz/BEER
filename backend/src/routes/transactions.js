import { Router } from "express";
import { getTransactions } from "../db/transactions.js";

const router = Router();

router.get("/", async (req, res) => {
  const transactions = await getTransactions();
  res.json(transactions);
})

export default router;
