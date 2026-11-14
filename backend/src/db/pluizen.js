import { pool } from "./pool.js"
import { ApiError } from "../middleware/errors.js";

export async function createPluis({ naam, lidstatusId }) {
  try {
    const [res] = await pool.execute("INSERT INTO pluizen (naam, lidstatus_id) VALUES (?, ?);", [naam, lidstatusId]);
    return getPluis(res.insertId);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new ApiError(409, `Er is al een pluis met naam "${naam}"`);
    }
    throw err;
  }
}

export async function deletePluis(id) {
  const [res] = await pool.execute("DELETE FROM pluizen WHERE id = ?;", [id]);
  if (res.affectedRows === 0) {
    throw new ApiError(404, `Pluis met id ${id} niet gevonden`);
  }
}

export async function getPluizen() {
  const [rows] = await pool.execute("SELECT id, naam, lidstatus_id, DATE_FORMAT(indrinkdatum, '%d-%m-%Y') AS indrinkdatum FROM pluizen;");
  if (rows.length === 0) {
    throw new ApiError(404, "Geen pluizen gevonden");
  }
  return rows;
}

export async function getPluis(id) {
  const [rows] = await pool.execute("SELECT * FROM pluizen WHERE id = ?;", [id]);
  if (rows.length === 0) {
    throw new ApiError(404, `Pluis met id ${id} niet gevonden`);
  }
  return rows[0];
}

export async function getPluisByNaam(naam) {
  const [rows] = await pool.execute("SELECT * FROM pluizen WHERE naam = ?;", [naam]);
  if (rows.length === 0) {
    throw new ApiError(404, `Pluis naam "${naam}" niet gevonden`);
  }
  return rows[0];
}
