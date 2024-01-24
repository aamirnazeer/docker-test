import express from 'express';
import { stan } from './nats';

const server = express();

server.get('/', (req, res) => {
  res.send({ message: 'success from new', variable: process.env.VARIABLE });
});

server.get('/nats', (req, res) => {
  stan.publish('testSubject', { message: 'kukli from app2' });
  res.send({ message: 'susces' });
});

server.get('/nats2', (req, res) => {
  stan.publish('testSubject', { message: 'kukli from app2' });
  res.send({ message: 'susces' });
});

server.get('/nats3', (req, res) => {
  stan.publish('testSubject', { message: 'kukli from app2' });
  res.send({ message: 'susces' });
});

server.get('/nats4', (req, res) => {
  stan.publish('testSubject', { message: 'kukli from app2' });
  res.send({ message: 'susces' });
});

export { server };
