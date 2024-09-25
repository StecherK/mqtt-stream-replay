import { Test, TestingModule } from '@nestjs/testing';
import { MqttLogService } from './mqtt-log.service';

describe('MqttLogService', () => {
  let service: MqttLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttLogService],
    }).compile();

    service = module.get<MqttLogService>(MqttLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
