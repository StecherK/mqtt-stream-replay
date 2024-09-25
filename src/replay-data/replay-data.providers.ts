import { DataSource } from 'typeorm';
import { ReplayData } from './replay-data.entity';

export const replayDataProviders = [
  {
    provide: 'REPLAY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ReplayData),
    inject: ['DATA_SOURCE'],
  },
];