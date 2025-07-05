import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Use built-in Express middleware for URL-encoded parsing (for form data)
app.use(express.urlencoded({ extended: true }));

app.get("/pass", (req, res) => {
const demoPasswords = [
  {
    id: 1,
    title: "Gmail",
    url: "https://gmail.com",
    password: "Demo@123",
    createdAt: "2024-01-20",
  },
  {
    id: 2,
    title: "GitHub",
    url: "https://github.com",
    password: "Test@456",
    createdAt: "2024-01-21",
  },
];
  res.send(demoPasswords);
});

app.post("/post", (req, res) => {
  console.log(`
title: ${req.body.title},
URl: ${req.body.url},
password: ${req.body.password}`);
  res.json({ message: "Pass saved successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`);
});
