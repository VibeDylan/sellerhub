import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'sellerhubid',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'seller-events-logger' });

async function main() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'seller-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) {
        return;
      }
      const raw = message.value.toString('utf-8');
      const event = JSON.parse(raw);

      console.log('Type :', event.type);
      console.log('Payload :', event.payload);
    },
  });
}

main();
