import { server } from './server';

const start = async () => {
  server.listen(3000, () => {
    console.log('sever started on port 3000');
  });
};

start();
