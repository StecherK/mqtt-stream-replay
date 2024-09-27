import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MqttLogModule } from './mqtt-log/mqtt-log.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttPublisherService } from './mqtt-publisher/mqtt-publisher.service';
import { MqttPublisherModule } from './mqtt-publisher/mqtt-publisher.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), 

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, 
      synchronize: true,       //! not recommended for production
    }),

    MqttLogModule, 

    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883', 
        },
      },
    ]), MqttPublisherModule,
  ],
  controllers: [],
  providers: [MqttPublisherService],
})
export class AppModule {}
