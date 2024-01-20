import express from 'express';
import { config } from 'dotenv';
import { json } from 'express';
import { nc } from './nats';

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

nc.on('connect', () => {
  console.log('connected');
});

server.listen(3000, () => {
  console.log('Server Started on port 3000');
  console.log(process.env.VARIABLE);
});
