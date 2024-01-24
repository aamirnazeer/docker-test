import express from 'express';
import { config } from 'dotenv';
import { stan } from './nats';

const server = express();
config();

server.get('/', (req, res) => {
  res.send({ message: 'success from new', variable: process.env.VARIABLE });
});

server.get('/nats', (req, res) => {
  stan.publish('testSubject', { message: 'kukli from app2' });
  res.send({ message: 'susces' });
});

export { server };
