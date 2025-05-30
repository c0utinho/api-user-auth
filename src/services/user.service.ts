import UserRepository from "../repositories/user.repository";
import { CreateUserDTO } from "../dtos/create-user.dto";

export default class UserService {
  private repository = new UserRepository();

  createUser(userData: CreateUserDTO) {
    return this.repository.create(userData);
  }

  getAllUsers() {
    return this.repository.findAll();
  }

  deleteUser(id: number) {
    return this.repository.delete(id);
  }
}