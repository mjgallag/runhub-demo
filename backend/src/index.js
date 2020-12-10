const express = require('express');

const app = express();
const port = process.env.NODE_ENV === 'production' ? 8080 : 4000;

app.get('/api/message', (req, res) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`);
});
