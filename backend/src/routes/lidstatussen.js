import { Router } from "express";
import { getLidstatussen } from "../db/lidstatussen.js";

const router = Router();

router.get("/", async (req, res) => {
  const lidstatussen = await getLidstatussen();
  res.json(lidstatussen);
});

export default router;
