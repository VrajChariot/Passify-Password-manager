import mongoose from "mongoose";

const PassDataSchema = new mongoose.Schema({
  Title: String,
  URL: String,
  Password: String,
});

export const PassData = mongoose.model("Pass-Detial", PassDataSchema);
