import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';
import { MqttLog } from './mqtt-replay.entity';
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
  
  onModuleInit() {
    this.initializeCronJob();
  }

  
  private initializeCronJob() {
    const job = new CronJob(
      '* * * * *',
      async () => {
        this.logger.debug('Running replay job...');
        await this.replayUnsentMessages();
        this.logger.debug('Replay job completed.');
      },
      null,            
      true,            
      'Europe/Copenhagen',
    );

    this.logger.debug('Cron job initialized for replay');
  }

  public async replayUnsentMessages(): Promise<void> {
    try {
      const logs = await this.mqttLogRepository.find();

      for (const log of logs) {
        const topic = log.topic;
        const message = JSON.stringify(log.payload);
        
        // Publish message back to the original topic
        this.mqttClient.publish(topic, message, { qos: 1 }, (err) => {
          if (err) {
            this.logger.error(`Failed to publish message on topic "${topic}": ${err.message}`);
          } else {
            this.logger.debug(`Message resent on topic "${topic}"`);
          }
        });
      }

      this.logger.log('All unsent messages replayed.');
    } catch (error) {
      this.logger.error(`Failed to replay messages: ${error.message}`);
    }
  }

}
