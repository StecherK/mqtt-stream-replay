import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MqttLog } from './mqtt-log.entity';
import { MqttLogService } from './mqtt-log.service';

describe('MqttLogService', () => {
  let service: MqttLogService;
  let repository: Repository<MqttLog>;

  const mockRepository = {
    save: jest.fn().mockResolvedValue(true),
    find: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MqttLogService,
        {
          provide: getRepositoryToken(MqttLog),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MqttLogService>(MqttLogService);
    repository = module.get<Repository<MqttLog>>(getRepositoryToken(MqttLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
