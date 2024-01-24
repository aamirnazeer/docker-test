import { server } from './server';
import { config } from 'dotenv';
import { stan } from './nats';

config();

const start = async () => {
  if (!process.env.VARIABLE) {
    throw new Error('VARIABLE not found');
  }

  await stan
    .connect('http://my-nats:4222')
    .then(() => {
      console.log('Successfully connected to NATS');
    })
    .catch((error) => {
      console.error('Failed to connect to NATS:', error);
    });

  // Subscribe to a subject
  stan.subscribe('testSubject', (data) => {
    console.log('Received data:', data);
  });

  server.listen(3000, () => {
    console.log('sever started on port 3000');
  });
};

start();
