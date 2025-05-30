import { Pool } from "pg";

const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "user_api",
  password: "password",
  port: 5432,
});

export default pool;
