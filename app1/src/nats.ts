import { connect, NatsConnection, Subscription, JSONCodec } from 'nats';

class NatsClient {
  private connection: NatsConnection | null = null;
  private jsonCodec = JSONCodec();

  constructor() {}

  async connect(url: string) {
    if (this.connection) {
      console.warn('Already connected to NATS');
      return;
    }

    try {
      this.connection = await connect({ servers: url, noEcho: true });
      console.log('Connected to NATS');
      return;
    } catch (error) {
      console.error('Error connecting to NATS:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.drain();
      await this.connection.close();
      this.connection = null;
      console.log('Disconnected from NATS');
    }
  }

  async publish(subject: string, data: any): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to NATS');
    }
    this.connection.publish(subject, this.jsonCodec.encode(data));
  }

  subscribe(subject: string, callback: (data: any) => void): Subscription {
    if (!this.connection) {
      throw new Error('Not connected to NATS');
    }
    const subscription = this.connection.subscribe(subject);
    (async () => {
      for await (const message of subscription) {
        callback(this.jsonCodec.decode(message.data));
      }
    })();
    return subscription;
  }
}

export const stan = new NatsClient();
