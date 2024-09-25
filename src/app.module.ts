import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MqttLogModule } from './mqtt-log/mqtt-log.module'; // Import your MQTT logging module
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(), // Optional: for loading env variables

    // TypeORM setup for PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'your_db_user',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'your_db_name',
      autoLoadEntities: true,  // Automatically load entities
      synchronize: true,       // Auto-sync DB schema (disable in production)
    }),

    MqttLogModule, // Import your module for handling MQTT logging

    // MQTT client configuration
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://your_mqtt_broker_url', // Replace with your actual MQTT broker URL
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
