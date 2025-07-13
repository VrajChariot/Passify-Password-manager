import mongoose from "mongoose";

const PassDataSchema = new mongoose.Schema({
  Title: String,
  URL: String,
  Password: String,
  userId: { type: String, required: true },
});

export const PassData = mongoose.model("Pass-Detial", PassDataSchema);
