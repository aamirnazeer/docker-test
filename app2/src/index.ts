import { server } from './server';
import { config } from 'dotenv';

config();

const start = async () => {
  if (!process.env.VARIABLE) {
    throw new Error('VARIABLE not found');
  }
  
  server.listen(3000, () => {
    console.log('sever started on port 3000');
  });
};

start();
