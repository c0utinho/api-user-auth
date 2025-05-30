import express from "express";
import path from "path";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { authenticateToken } from "./middleware/auth.middleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
