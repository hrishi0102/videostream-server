import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuisv4 } from "uuid";
import path from "path";

const app = express();

// cors middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from a server
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
