import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MqttLogModule } from './mqtt-log/mqtt-log.module'; 
import { MqttReplayService } from './mqtt-emitter/mqtt-replay-emitter.service';
import { MqttReplayController } from './mqtt-emitter/mqtt-replay-controller';
import { MqttLog } from './mqtt-log/mqtt-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [MqttLog],
      autoLoadEntities: true,  
      synchronize: true,      
    }),
    TypeOrmModule.forFeature([MqttLog]),
    MqttLogModule, 
  ],
  controllers: [MqttReplayController],
  providers: [MqttReplayService],
})
export class AppModule {}
