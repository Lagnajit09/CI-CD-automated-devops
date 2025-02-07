import express from "express";
import todoRoutes from "./routes/todos";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
