import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";

const userRepository = new UserRepository();
const SECRET_KEY = "meusegredosecreto";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await userRepository.findByEmail(email);
  if (!users || users.length === 0) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }
  const user = users[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Senha inválida" });
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
};
