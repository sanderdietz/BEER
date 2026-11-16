import { pool } from "./pool.js"
import { ApiError } from "../middleware/errors.js";

export async function getTransactions() {
  const [rows] = await pool.execute(
    `
    SELECT transactions.id, from_account.name AS from_account, to_account.name AS to_account, transaction_type, transaction_date, description
    FROM transactions
    LEFT JOIN accounts from_account
    ON transactions.from_account_id = from_account.id
    LEFT JOIN accounts to_account
    ON transactions.to_account_id = to_account.id
    LEFT JOIN transaction_types
    ON transaction_type_id = transaction_types.id;
    `);
  //SELECT from_account.name AS from_account, to_account.name AS to_account FROM transactions LEFT JOIN accounts from_account ON transactions.from_account_id = from_account.id LEFT JOIN accounts to_account ON transactions.to_account_id = to_account.id;
  if (rows.length === 0) {
    throw new ApiError(404, "Geen transacties gevonden");
  }
  console.log(rows);
  return rows;
}
