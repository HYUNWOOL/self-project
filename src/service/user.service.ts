// userService.ts

import { AmqpService } from "./amqp.service";

export class UserService {
  static async sendMessage(message: string, queue: string) {
    const { channel, connection } = await AmqpService.createChannel();

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`[x] Sent ${message}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  }
}
