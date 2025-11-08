CREATE TABLE IF NOT EXISTS sensor_readings (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL,
  type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT,
  status TEXT DEFAULT 'ativo',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sensor_timestamp ON sensor_readings (timestamp DESC);
