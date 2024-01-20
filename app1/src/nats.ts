import nats from 'nats';

export const nc = await nats.connect({ servers: 'http://nats:4222' });
