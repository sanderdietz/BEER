import { pool } from "./pool.js"
import { ApiError } from "../middleware/errors.js";

export async function getLidstatussen() {
  const [rows] = await pool.execute("SELECT * FROM lidstatussen;");
  if (rows.length === 0) {
    throw new ApiError(404, "Geen lidstatussen gevonden");
  }
  return Object.fromEntries(rows.map(item => [item.id, item.lidstatus]));
}
