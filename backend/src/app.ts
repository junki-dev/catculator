import cors from 'cors';
import express from 'express';

const app = express();

//* Middleware //
app.use(cors());

//* Router //
app.get('/', (_, res) => res.send('Calculator API Server.')); // Health Check

export { app };
