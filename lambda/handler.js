import fetch from 'node-fetch';

export const handler = async () => {
  const r = await fetch(process.env.API_URL + '/sensors');
  const sensors = await r.json();

  const total = sensors.length;
  const avgValue = sensors.reduce((sum, s) => sum + s.value, 0)/total;

  return {
    statusCode: 200,
    body: JSON.stringify({ totalSensors: total, avgValue, lastUpdate: new Date().toISOString() })
  };
};
