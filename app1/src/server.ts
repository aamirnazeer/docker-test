import express from 'express';
import { config } from 'dotenv';
import { json } from 'express';
import { JSONCodec } from 'nats';
import NatsWrapper from './tla';

const server = express();
const jc = JSONCodec();

config();

server.use(json());

server.get('/', (req, res) => {
  res.send({ message: 'success from new', variable: process.env.VARIABLE });
});

server.get('/a', async (req, res) => {
  res.send({ message: 'a nats success' });
});

server.get('/nats', async (req, res) => {
  const stan = await NatsWrapper();
  stan.publish('testSubject', { hello: 'kukul' });
  res.send({ message: 'req success' });
});

export { server };
