
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'default',
        password: 'default',
        database: 'replaydata',
        entities: [
            __dirname + '/../**/*.entity{.ts}',
        ],
        synchronize: true, //! not in production
      });

      return dataSource.initialize();
    },
  },
];
