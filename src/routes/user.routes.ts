import { Router } from "express";
import { createUser, getAllUsers, deleteUser } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Rota pública 
router.post("/", createUser);

// Rotas protegidas
router.get("/", authenticateToken, getAllUsers);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
