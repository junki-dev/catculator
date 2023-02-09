import 'reflect-metadata';
import 'es6-shim';

import { ResponseLogger } from './middleware';

import calc from '@calculator/index';
import feed from '@feed/index';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

//* Middleware //
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(ResponseLogger);

//* Router //
app.get('/', (_, res) => res.send('Calculator API Server.')); // Health Check

// calculator
app.use('/calc', calc);
app.use('/feed', feed);

export { app };
