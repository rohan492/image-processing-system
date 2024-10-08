import amqp from 'amqplib';
import config from '../config';

let connection;
let channel;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(config.rabbitmqUrl);
    channel = await connection.createChannel();
    
    console.log('Connected to RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

async function getChannel() {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
}

async function publishToQueue(queue, message) {
  const ch = await getChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
}

async function consumeFromQueue(queue, callback) {
  const ch = await getChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.consume(queue, (msg) => {
    if (msg !== null) {
      callback(JSON.parse(msg.content.toString()));
      ch.ack(msg);
    }
  });
}

export { connectRabbitMQ, publishToQueue, consumeFromQueue };