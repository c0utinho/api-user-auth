import pool from "../config/database";
import { CreateUserDTO } from "../dtos/create-user.dto";

export default class UserRepository {
  async create(userData: CreateUserDTO) {
    const { name, email, password } = userData;
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  async delete(id: number) {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async findByEmail(email: string) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows;
  }
}
