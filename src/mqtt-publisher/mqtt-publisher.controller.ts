import { Body, Controller, Post } from '@nestjs/common';
import { MqttPublisherService } from './mqtt-publisher.service';

@Controller('mqtt-publisher')
export class MqttPublisherController {
  constructor(private readonly mqttPublisherService: MqttPublisherService) {}

  async publish(@Body() body: { topic: string; message: string; timestamp?: Date }) {
    const timestamp = body.timestamp || new Date();
    await this.mqttPublisherService.publishMessage(body.topic, body.message, timestamp);
    return { status: 'Message published!' };
  }
}