// detailService.ts

import { AmqpService } from "./amqp.service";

export class DetailService {
  static async receiveMessage(queue: string) {
    const { channel } = await AmqpService.createChannel();

    channel.assertQueue(queue, {
      durable: true,
    });

    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(
      queue,
      (msg) => {
        if (msg) {
          console.log(`[x] Received ${msg.content.toString()}`);
          channel.ack(msg);  // Add this line to acknowledge receipe
        }
      },
      {
        noAck: false,
      }
    );
  }
}
