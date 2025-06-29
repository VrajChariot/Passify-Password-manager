import express from 'express';
import cors from 'cors';
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

// Use built-in Express middleware for URL-encoded parsing (for form data)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/post', (req, res) => {
console.log(`
title: ${req.body.title},
URl: ${req.body.url},
password: ${req.body.password}`
);
    res.json({message: 'Pass saved successfully'})
  })

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
})