import { Module } from '@nestjs/common';
import { MqttModule } from './mqtt/mqtt.module';
import { DatabaseModule } from './db/database.module';
import { ReplayModule } from './replay-data/replay-data.module';

@Module({
  imports: [MqttModule, DatabaseModule, ReplayModule],
})
export class AppModule {}