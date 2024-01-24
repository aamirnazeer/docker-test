import { connect, JSONCodec, Subscription } from 'nats';

const jc = JSONCodec();

let instance: Awaited<ReturnType<typeof connect>>;

function publish(subject: string, data: any) {
  instance.publish(subject, jc.encode(data));
}

function subscribe(
  subject: string,
  callback: (data: any) => void
): Subscription {
  const subscription = instance.subscribe(subject);
  (async () => {
    for await (const message of subscription) {
      callback(jc.decode(message.data));
    }
  })();
  return subscription;
}

async function disconnect(): Promise<void> {
  if (instance) {
    await instance.drain();
    await instance.close();
    console.log('Disconnected from NATS');
  }
}

async function NatsWrapper() {
  if (!instance) {
    instance = await connect({ servers: 'http://my-nats:4222', noEcho: true });
  }

  return { publish, subscribe, disconnect };
}

export default NatsWrapper;
