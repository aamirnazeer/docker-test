import { server } from './server';
import { config } from 'dotenv';
import { connect, JSONCodec } from 'nats';

config();

const jc = JSONCodec();
const start = async () => {
  if (!process.env.VARIABLE) {
    throw new Error('VARIABLE not found');
  }

  async function connectAndListen() {
    const nc = await connect({ servers: 'http://my-nats:4222' });

    const subscription = nc.subscribe('test');

    (async (sub) => {
      for await (const msg of sub) {
        console.log(jc.decode(msg.data), `subject ${msg.subject}`);
      }
    })(subscription);
  }

  connectAndListen();

  server.listen(3000, () => {
    console.log('sever started on port 3000');
  });
};

start();
