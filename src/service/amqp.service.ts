// amqpService.ts
import * as amqp from 'amqplib';

export class AmqpService {
  static async createChannel() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    return { connection, channel };
  }
}
