import * as mqtt from 'mqtt';
import { MqttReplayService } from './mqtt-replay-emitter.service';
import { Repository } from 'typeorm/repository/Repository';
import { MqttLog } from '../mqtt-log/mqtt-log.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MQTT_CLIENT } from './mqtt-replay-emitter.constants';


jest.mock('mqtt', () => ({
    connect: jest.fn(() => ({
      publish: jest.fn(),
      on: jest.fn(),
    })),
  }));

describe('MqttReplayService', () => {
  let service: MqttReplayService;
  let mqttClient: jest.Mocked<mqtt.MqttClient>;
  let mqttLogRepository: jest.Mocked<Repository<MqttLog>>;

  beforeEach(async () => {
	// Create a mocked instance of Repository<MqttLog>
	const mockMqttLogRepository = {
	  createQueryBuilder: jest.fn().mockReturnValue({
		where: jest.fn().mockReturnThis(),
		getMany: jest.fn().mockResolvedValue([]), // Default behavior returns an empty array
	  }),
	};

	// Provide mock objects for Repository and MQTT client
	const module: TestingModule = await Test.createTestingModule({
	  providers: [
		MqttReplayService,
		{
		  provide: getRepositoryToken(MqttLog), // Inject the repository mock
		  useValue: mockMqttLogRepository,
		},
		{
		  provide: MQTT_CLIENT, // Inject the mocked mqtt client
		  useValue: mqtt.connect(process.env.MQTT_URL),
		},
	  ],
	}).compile();

	service = module.get<MqttReplayService>(MqttReplayService);
	mqttClient = module.get<jest.Mocked<mqtt.MqttClient>>(MQTT_CLIENT);
	mqttLogRepository = module.get(getRepositoryToken(MqttLog));

	// Mock mqttClient behavior
	mqttClient.publish = jest.fn((topic, message, options?, callback?) => {
	  if (callback) {
		callback(null); // Simulate successful message publishing
	  }
	  return true; // Simulate the return value of the publish method
	}) as any;
  });

  it('should be defined', () => {
	expect(service).toBeDefined();
  });
});
