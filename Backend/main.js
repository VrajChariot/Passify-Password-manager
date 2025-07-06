import express from "express";
import cors from "cors";
import { PassData } from "./models/PassList.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

try {
  let connDB = await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB:", connDB.connection.name);
} catch (error) {
  console.error("MongoDB connection error:", error);
}

app.use(cors());
app.use(express.json());

// Use built-in Express middleware for URL-encoded parsing (for form data)
app.use(express.urlencoded({ extended: true }));

app.get("/pass", async (req, res) => {
  const PasswordData = await PassData.find({}).sort({ _id: -1 });
  console.log("Fetched Password Data:", PasswordData);
  res.send(PasswordData);
});

app.post("/post", async (req, res) => {
  console.log(`
title: ${req.body.title},
URl: ${req.body.url},
password: ${req.body.password}`);
  try {
    await PassData.create({
      Title: req.body.title,
      URL: req.body.url,
      Password: req.body.password,
    });
    res.json({ message: "Pass saved successfully" });
  } catch (error) {
    console.error("Error saving password:", error);
    return res.status(500).json({ error: "Failed to save password" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`);
});
