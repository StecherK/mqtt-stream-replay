import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { replayDataProviders } from './replay-data.providers';
import { ReplayService } from './replay-data.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...replayDataProviders,
    ReplayService,
  ],
})
export class ReplayModule {}
