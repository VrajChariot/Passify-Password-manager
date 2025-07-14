import express from "express";
import cors from "cors";
import { PassData } from "./models/PassList.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { ClerkExpressWithAuth, requireAuth } from "@clerk/clerk-sdk-node";
import { clerkMiddleware, requireAuth } from "@clerk/express";

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🧠 Connect to MongoDB inside an async function
async function startServer() {
  try {
    const connDB = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB:", connDB.connection.name);

    // ✅ Routes that require user auth
    app.get("/pass", requireAuth(), async (req, res) => {
      const { userId } = req.auth();
      const PasswordData = await PassData.find({ userId }).sort({ _id: -1 });
      res.send(PasswordData);
    });

    app.post("/post", requireAuth(), async (req, res) => {
      const { userId } = req.auth();
      try {
        await PassData.create({
          Title: req.body.title,
          URL: req.body.url,
          Password: req.body.password,
          userId: userId,
        });
        res.json({ message: "Pass saved successfully" });
      } catch (error) {
        console.error("Error saving password:", error);
        return res.status(500).json({ error: "Failed to save password" });
      }
    });

    app.delete("/pass/:id", requireAuth(), async (req, res) => {
      const { userId } = req.auth();
      try {
        const item = await PassData.findById(req.params.id);
        if (!item || item.userId !== userId) {
          return res
            .status(403)
            .json({ success: false, message: "Unauthorized" });
        }
        await PassData.findByIdAndDelete(req.params.id);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ success: false });
      }
    });

    // ✅ Start server after DB is connected
    app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}/`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

startServer(); // call the async function
