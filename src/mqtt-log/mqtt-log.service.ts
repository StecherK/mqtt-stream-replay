import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { MqttLog } from './mqtt-log.entity';
import { log, time } from 'console';

@Injectable()
export class MqttLogService implements OnModuleInit {
  private readonly logger = new Logger(MqttLogService.name);

  constructor(
    @InjectRepository(MqttLog)
    private mqttLogRepository: Repository<MqttLog>,
  ) {}

  onModuleInit() {
    this.initializeSubscriptions();
  }

  private initializeSubscriptions() {
    const mqttClient = require('mqtt').connect(process.env.MQTT_URL);
    mqttClient.subscribe('#', (err) => {
      if (err) {
        this.logger.error(`Failed to subscribe: ${err.message}`);
      } else {
        this.logger.debug('Successfully subscribed');
      }
    });

    mqttClient.on('message', async (topic: string, payload: Buffer) => {
      const message = JSON.parse(payload.toString());
      this.logger.debug(`Received message for topic "${topic}": ${JSON.stringify(message)}`);
      await this.logMqttMessage(topic, message);
    });
  }

  public async logMqttMessage(topic: string, payload: any): Promise<void> {
    let timestamp: Date;
    let parsedDate;
    if (payload.timestamp) {
        parsedDate = Date.parse(payload.timestamp);
    } else if(payload.starttime) {
        parsedDate = Date.parse(payload.starttime);
    } 
    if (isNaN(parsedDate)) {
      timestamp = new Date();
      this.logger.debug(`Invalid timestamp provided: ${timestamp}`);
    }else{
    timestamp = new Date(parsedDate);
    this.logger.debug(`Timestamp provided: ${timestamp}`);
    }

    const logEntry = this.mqttLogRepository.create({ topic, payload: payload, timestamp });
    try {
      await this.mqttLogRepository.save(logEntry);
      this.logger.debug(`Message logged successfully for topic "${topic}"`);
    } catch (error) {
      this.logger.error(`Failed to save log: ${error.message}`);
    }
  } 
}
