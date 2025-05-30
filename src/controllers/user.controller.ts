import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserService from "../services/user.service";
import { CreateUserDTO } from "../dtos/create-user.dto";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userService.createUser({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = await userService.deleteUser(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
};