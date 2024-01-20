import express from 'express';
import { config } from 'dotenv';
import a from './nats';

const server = express();
config();

server.get('/', (req, res) => {
  res.send({ message: 'success from new', variable: process.env.VARIABLE });
});

console.log('hello');

a();

server.listen(3000, () => {
  console.log('Server Started on port 3000');
  console.log(process.env.VARIABLE);
});
