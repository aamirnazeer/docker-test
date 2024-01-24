import { connect, JSONCodec, Subscription } from 'nats';

const jc = JSONCodec();

let instance: Awaited<ReturnType<typeof connect>>;

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

export const stan = { publish, subscribe };
