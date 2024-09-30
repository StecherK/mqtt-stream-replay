import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MqttLogModule } from './mqtt-log/mqtt-log.module'; 

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
      autoLoadEntities: true,  
      synchronize: true,      
    }),

    MqttLogModule, 
  ],
})
export class AppModule {}
