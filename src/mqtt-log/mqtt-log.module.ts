import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttLogService } from './mqtt-log.service';
import { MqttLog } from './mqtt-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MqttLog])], // Register the MqttLog entity
  providers: [MqttLogService],
  exports: [MqttLogService],
})
export class MqttLogModule {}
