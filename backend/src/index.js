const cors = require('cors');
const express = require('express');

const backend = express();
const port = process.env.PORT || 4000;

backend.use(
  cors({
    origin: process.env.RUNHUB_SERVICE_FRONTEND_URL || 'http://localhost:3000',
  })
);

backend.get(`/message`, (req, res) => {
  res.json('Hello World!');
});

backend.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`);
});
