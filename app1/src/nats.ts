import { connect, JSONCodec, Subscription, NatsConnection } from 'nats';

const jc = JSONCodec();

let instance: NatsConnection;

async function NatsWrapper() {
  if (!instance) {
    instance = await connect({ servers: 'http://my-nats:4222', noEcho: true });
    console.log('connected to NATS');
  }
  return instance;
}

async function publish(subject: string, data: any) {
  const inst = await NatsWrapper();
  inst.publish(subject, jc.encode(data));
}

async function subscribe(
  subject: string,
  callback: (data: any) => void
): Promise<Subscription> {
  const inst = await NatsWrapper();
  const subscription = inst.subscribe(subject);
  (async () => {
    for await (const message of subscription) {
      callback(jc.decode(message.data));
    }
  })();
  return subscription;
}

async function disconnect(): Promise<void> {
  const inst = await NatsWrapper();
  if (inst) {
    await inst.drain();
    await inst.close();
    console.log('Disconnected from NATS');
  }
}

export const stan = { publish, subscribe, disconnect };
