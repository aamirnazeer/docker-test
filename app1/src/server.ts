import express from 'express';
import { json } from 'express';
import { stan } from './nats';

const server = express();

server.use(json());

server.get('/', (req, res) => {
  res.send({ message: 'success from new', variable: process.env.VARIABLE });
});

server.get('/a', async (req, res) => {
  res.send({ message: 'a nats success' });
});

stan.publish('testSubject', { hello: 'kukul from file straight' });

server.get('/nats', async (req, res) => {
  stan.publish('testSubject', { hello: 'kukul' });
  res.send({ message: 'req success' });
});

server.get('/nats2', async (req, res) => {
  stan.publish('testSubject', { hello: 'kukul' });
  res.send({ message: 'req success' });
});

server.get('/nats3', async (req, res) => {
  stan.publish('testSubject', { hello: 'kukul' });
  res.send({ message: 'req success' });
});

server.get('/nats4', async (req, res) => {
  stan.publish('testSubject', { hello: 'kukul' });
  res.send({ message: 'req success' });
});

server.get('/close', async (req, res) => {
  stan.disconnect();
  res.send({ message: 'req success' });
});

export { server };
