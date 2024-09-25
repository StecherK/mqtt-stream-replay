import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MqttLog } from './mqtt-log.entity';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class MqttLogService {
  private readonly logger = new Logger(MqttLogService.name);

  constructor(
    @InjectRepository(MqttLog)
    private mqttLogRepository: Repository<MqttLog>,
  ) {}

  // This function will log incoming MQTT messages into the PostgreSQL database
  async logMqttMessage(topic: string, payload: any): Promise<MqttLog> {
    this.logger.log(`Received MQTT message on topic: ${topic}`);
    const logEntry = this.mqttLogRepository.create({ topic, payload });
    return this.mqttLogRepository.save(logEntry);
  }

  // MQTT listener for a specific topic
  @MessagePattern('your/mqtt/topic')  // Replace with your actual topic
  async handleMqttMessage(payload: any) {
    const topic = 'your/mqtt/topic';  // You can extract this dynamically if needed
    this.logger.log(`Handling message for topic: ${topic}`);
    await this.logMqttMessage(topic, payload);
  }
}
