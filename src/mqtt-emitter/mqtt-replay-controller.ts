import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MqttReplayService } from './mqtt-replay-emitter.service';

@Controller('mqtt-replay')
export class MqttReplayController {
  constructor(private readonly mqttReplayService: MqttReplayService) {}
  /**
   * Endpoint to replay MQTT messages within a given time range.
   * @param startTime The start of the time range (required)
   * @param endTime The end of the time range (required)
   * @param topic The topic to replay messages from (optional)
   */
  @Get('resend')
  async replayMessages(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<string> {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Please use ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ).',
      );
    }

    if (start >= end) {
      throw new BadRequestException(
        'Start time must be earlier than end time.',
      );
    }

    await this.mqttReplayService.replayMessagesInTimeRange(start, end);

    return 'Messages within the specified time range have been replayed.';
  }

  @Get('resend-topic')
  async replayMessagesInTopic(@Query('topic') topic: string): Promise<string> {
    await this.mqttReplayService.replayMessagesInTopic(topic);

    return `Messages in topic "${topic}" have been replayed.`;
  }
}
