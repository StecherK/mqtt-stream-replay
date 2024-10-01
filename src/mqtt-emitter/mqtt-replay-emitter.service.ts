import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MqttLog } from '../mqtt-log/mqtt-log.entity';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttReplayService {
  private readonly logger = new Logger(MqttReplayService.name);
  private mqttClient: mqtt.MqttClient;
  
  constructor(
    @InjectRepository(MqttLog)
    private mqttLogRepository: Repository<MqttLog>,
  ) {
    this.mqttClient = mqtt.connect(process.env.MQTT_URL);
    this.mqttClient.on('connect', () => {
      this.logger.debug('MQTT client connected for replay');
    });
    this.mqttClient.on('error', (err) => {
      this.logger.error(`MQTT error: ${err.message}`);
    });
  }

  public async replayMessagesInTimeRange(startTime: Date, endTime: Date): Promise<void> {
    try {
      const logs = await this.mqttLogRepository.createQueryBuilder('log')
        .where('log.timestamp >= :startTime AND log.timestamp <= :endTime', { startTime, endTime })
        .getMany();

      if (!logs.length) {
        this.logger.log('No messages found in the given time range');
        return;
      }

      for (const log of logs) {
        const message = JSON.stringify(log.payload);
        
        // Publish message back to the original topic
        this.mqttClient.publish(log.topic, message, { qos: 1 }, (err) => {
          if (err) {
            this.logger.error(`Failed to publish message on topic "${log.topic}": ${err.message}`);
          } else {
            this.logger.debug(`Message resent on topic "${log.topic}"`);
          }
        });
      }

      this.logger.log('All unsent messages replayed.');
    } catch (error) {
      this.logger.error(`Failed to replay messages: ${error.message}`);
    }
  }

  public async replayMessagesInTopic(topic: string): Promise<void> {
    try {
      const logs = await this.mqttLogRepository.createQueryBuilder('log')
        .where('log.topic = :topic', { topic })
        .getMany();

      if (!logs.length) {
        this.logger.log('No messages found in the given topic');
        return;
      }

      for (const log of logs) {
        const message = JSON.stringify(log.payload);
        
        // Publish message back to the original topic
        this.mqttClient.publish(log.topic, message, { qos: 1 }, (err) => {
          if (err) {
            this.logger.error(`Failed to publish message on topic "${log.topic}": ${err.message}`);
          } else {
            this.logger.debug(`Message resent on topic "${log.topic}"`);
          }
        });
      }

      this.logger.log('All unsent messages replayed.');
    } catch (error) {
      this.logger.error(`Failed to replay messages: ${error.message}`);
    }
  }
}
