

const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost:1883';
const client = mqtt.connect(brokerUrl);

const topic = 'topic1';
const message = JSON.stringify({
  data: 'message type 3 data',
  timestamp: "2024-09-30T10:42:38Z"
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
