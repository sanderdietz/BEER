import { pool } from "./pool.js"
import { ApiError } from "../middleware/errors.js";

export async function getTransactionTypes() {
  const [rows] = await pool.execute("SELECT * FROM transaction_types;");
  if (rows.length === 0) {
    throw new ApiError(404, "Geen transactietypes gevonden");
  }
  return Object.fromEntries(rows.map(item => [item.id, item.transaction_type]));
}
