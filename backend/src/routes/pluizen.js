import { Router } from "express";
import { createPluis, deletePluis, getPluis, getPluisByNaam, getPluizen } from "../db/pluizen.js";

const router = Router();

router.get("/", async (req, res) => {
  const pluizen = await getPluizen();
  res.json(pluizen);
});

router.get("/:naam", async (req, res) => {
  const { naam } = req.params;
  const pluis = await getPluisByNaam(naam);
  res.json(pluis);
});

router.post("/", async (req, res) => {
  const { naam, lidstatusId } = req.body;
  const pluis = await createPluis({ naam, lidstatusId });
  return res.status(201).json(pluis);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deletePluis(id);
  res.sendStatus(204);
});

export default router;
