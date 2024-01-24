import { server } from './server';
import { config } from 'dotenv';
import { stan } from './nats';

config();

const start = async () => {
  if (!process.env.VARIABLE) {
    throw new Error('VARIABLE not found');
  }

  stan.subscribe('testSubject', (data) => {
    console.log('Received data:', data);
  });

  server.listen(3000, () => {
    console.log('sever started on port 3000');
  });
};

start();
