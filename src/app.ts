import express from "express";
import path from "path";
import cors from "cors";       
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { authenticateToken } from "./middleware/auth.middleware";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/users", authenticateToken, userRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
