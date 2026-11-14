import { Router } from "express";
import { createAccount, deleteAccount, getAccount, getAccounts, getAccountTypes } from "../db/accounts.js";

const router = Router();

router.get("/", async (req, res) => {
  const accounts = await getAccounts();
  res.json(accounts);
});

router.get("/types", async (req, res) => {
  const accountTypes = await getAccountTypes();
  res.json(accountTypes);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const account = getAccount(id);
  res.json(account);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const account = await createAccount(name);
  res.status(201).json(account);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deleteAccount(id);
  res.sendStatus(204);
});

export default router;
