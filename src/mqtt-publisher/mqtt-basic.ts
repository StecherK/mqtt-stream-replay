

const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost:1883';
const client = mqtt.connect(brokerUrl);

const topic = 'Data123';
const message = JSON.stringify({
  data: 'freq: 50.1 temp: 45deg. something else',
  timestamp: "2021-09-01T12:00:00Z"
});

client.on('connect', () => {
  console.log(`Connected to broker: ${brokerUrl}`);

  client.publish(topic, message, () => {
    console.log(`Message "${message}" sent to topic "${topic}"`);

    client.end();
  });
});

client.on('error', (err) => {
  console.error('Error:', err);
});
