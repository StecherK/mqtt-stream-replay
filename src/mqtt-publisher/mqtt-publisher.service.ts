import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class MqttPublisherService {
  private readonly logger = new Logger(MqttPublisherService.name);
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883', 
      },
    });
  }

  async publishMessage(topic: string, message: string, timestamp: Date) {
    this.logger.log(`Publishing message to topic: ${topic}`);
    await this.client.emit('battcon', { message, timestamp });
  }
}

