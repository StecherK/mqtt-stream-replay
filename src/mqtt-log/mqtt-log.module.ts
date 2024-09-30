import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttLog } from './mqtt-log.entity';
import { MqttLogService } from './mqtt-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([MqttLog])],
  providers: [MqttLogService],
})
export class MqttLogModule {}
