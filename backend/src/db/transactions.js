import { pool } from "./pool.js"
import { ApiError } from "../middleware/errors.js";

export async function getTransactions() {
  const [rows] = await pool.execute("SELECT * FROM transactions;");
  if (rows.length === 0) {
    throw new ApiError(404, "Geen transacties gevonden");
  }
  return rows;
}
