import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @EventPattern('replaydata')
  async handleReplayData(@Payload() data: any) {
    console.log('Received MQTT message:', data);
    const { sourcetopic, replaydata } = data;
    await this.mqttService.saveReplayData(sourcetopic, replaydata);
  }
}
