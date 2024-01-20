import { connect, StringCodec } from 'nats';

// to create a connection to a nats-server:
const a = async () => {
  const nc = await connect({ servers: 'http://nats:4222' });
  const sc = StringCodec();
  const sub = nc.subscribe('hello');
  (async () => {
    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }
    console.log('subscription closed');
  })();
  await nc.drain();
};

export default a;
