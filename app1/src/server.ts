import express from 'express';
import { config } from 'dotenv';
import { json } from 'express';

const server = express();
config();

server.use(json());

server.get('/', (req, res) => {
  res.send({ message: 'success from new', variable: process.env.VARIABLE });
});

server.get('/a', async (req, res) => {
  res.send({ message: 'a nats success' });
});

server.get('/kafka', async (req, res) => {
  res.send({ message: 'req success' });
});

export { server };
