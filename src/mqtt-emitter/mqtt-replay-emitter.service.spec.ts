import { MqttReplayService } from './mqtt-replay-emitter.service';
import { MqttClient } from 'mqtt/*';
import { MQTT_CLIENT } from './mqtt-replay-emitter.constants';

// describe('MqttReplayService', () => {
//   let service: MqttReplayService;
//   let mqttClient: jest.Mocked<MqttClient>;

//   beforeAll(() => {
//     const { unit, unitRef } = TestBed.create(
//       MqttReplayService,
//     ).compile();

//     service = unit;
//     mqttClient = unitRef.get(MQTT_CLIENT);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
