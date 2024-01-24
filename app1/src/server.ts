import express from 'express';
import { config } from 'dotenv';
import { json } from 'express';
import { connect, JSONCodec } from 'nats';

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
  const nc = await connect({ servers: 'http://my-nats:4222', noEcho: true });
  nc.publish('test', jc.encode({ message: 'i am kukul' }));
  res.send({ message: 'req success' });
});

export { server };
