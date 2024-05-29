import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuisv4 } from "uuid";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
