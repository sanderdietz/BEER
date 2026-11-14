import { pool } from "./pool.js"
import { ApiError } from "../middleware/errors.js";

export async function getTransactieTypes() {
  const [rows] = await pool.execute("SELECT * FROM transactietypes;");
  if (rows.length === 0) {
    throw new ApiError(404, "Geen transactietypes gevonden");
  }
  return Object.fromEntries(rows.map(item => [item.id, item.transactietype]));
}
