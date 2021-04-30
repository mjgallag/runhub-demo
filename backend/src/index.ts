import cors from 'cors';
import express from 'express';

import { message } from 'message';

const backend = express();
const port = ((process.env.PORT as unknown) as number) || 4000;

backend.use(
  cors({
    origin: process.env.RUNHUB_SERVICE_FRONTEND_URL || 'http://localhost:3000',
  })
);

backend.use((_req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

backend.get('/message', (_req, res) => {
  res.json(message);
});

backend.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`);
});
