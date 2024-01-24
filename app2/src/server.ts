import express from 'express';
import { config } from 'dotenv';

const server = express();
config();

server.get('/', (req, res) => {
  res.send({ message: 'success from new', variable: process.env.VARIABLE });
});

export { server };
