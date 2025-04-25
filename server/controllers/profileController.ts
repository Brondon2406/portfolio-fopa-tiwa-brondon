import fs from "fs";
import path from "path";
import { Request, Response } from "express";

const dataPath = path.join(__dirname, "..", "profileData.json");

export const getProfile = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Impossible de lire les données." });
  }
};

export const updateProfile = (req: Request, res: Response) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ message: "Profil mis à jour avec succès." });
  } catch (error) {
    res.status(500).json({ error: "Impossible d'écrire les données." });
  }
};
