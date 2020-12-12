const express = require('express');

const app = express();
const basePath = process.env.RUNHUB_BACKEND_URL ? '' : '/backend';
const port = process.env.PORT || 4000;

app.get(`${basePath}/message`, (req, res) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`);
});
