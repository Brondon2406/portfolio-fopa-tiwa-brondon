import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/profile", profileRoutes);

app.get("/", (_, res) => {
  res.send("Portfolio backend API en ligne !");
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
