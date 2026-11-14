import mysql from "mysql2/promise"

export const pool = mysql.createPool({
  host: "mysql",
  user: "sander",
  password: "password",
  database: "beer-db"
});
