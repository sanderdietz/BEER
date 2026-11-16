import { pool } from "./pool.js";
import { ApiError } from "../middleware/errors.js";

export async function createAccount(name) {
  const [res] = await pool.execute(
    `
    INSERT INTO accounts (account_type_id, balance, name)
    VALUES (1, 0, ?);
    `,
    name
  );
  return getAccount(res.insertId);
}

export async function deleteAccount(id) {
  const [res] = await pool.execute(
    `
    DELETE FROM accounts
    WHERE id = ?;
    `,
    id
  );
  if (res.affectedRows === 0) {
    throw new ApiError(404, `Account met id ${id} niet gevonden`);
  }
}

export async function getAccount(id) {
  const [rows] = await pool.execute(
    `
    SELECT * FROM accounts
    WHERE id = ?;
    `,
    id
  );
  if (rows.length === 0) {
    throw new ApiError(404, `Account met id ${id} niet gevonden`);
  }
  return rows[0];
}

export async function getAccounts(query) {
  let queryString = `
SELECT accounts.id, name, account_type, balance, initiation_date
FROM accounts
LEFT JOIN account_types
ON accounts.account_type_id = account_types.id\n`;

  let params = [];
  if ("meeloper" in query) {
    params.push(1);
  }
  if ("lid" in query) {
    params.push(2);
  }
  if ("oud_lid" in query) {
    params.push(3);
  }
  if ("overig" in query) {
    params.push(4);
  }
  const account_type_placeholders = params.map(() => "?").join(",");

  if (params.length > 0) {
    queryString += `WHERE accounts.account_type_id IN (${account_type_placeholders})\n`;
  }

  const allowedColumns = ["id", "name", "balance", "initiation_date"];
  if ("order" in query && allowedColumns.includes(query["order"])) {
    queryString += `ORDER BY
${query["order"]} IS NOT NULL ASC,
${query["order"]} DESC\n`;
  }

  queryString += ";";
  console.log(queryString, params);

  const [rows] = await pool.execute(queryString, params);

  if (rows.length === 0) {
    throw new ApiError(404, `Geen accounts gevonden`);
  }
  return rows;
}

export async function getAccountTypes() {
  const [rows] = await pool.execute(
    `
    SELECT * FROM account_types;
    `
  );
  if (rows.length === 0) {
    throw new ApiError(404, "Geen account types gevonden");
  }
  return Object.fromEntries(rows.map(item => [item.id, item.account_type]));
}
