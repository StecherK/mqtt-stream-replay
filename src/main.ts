import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const mqttService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL,
    },
  });
  
  await mqttService.listen();
}
bootstrap();
