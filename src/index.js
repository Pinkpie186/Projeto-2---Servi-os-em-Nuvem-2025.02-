import express from 'express';
import { db } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// GET /readings - lista (com paginação simples)
app.get('/readings', async (req,res) => {
  const limit = parseInt(req.query.limit || '100', 10);
  const offset = parseInt(req.query.offset || '0', 10);
  const rows = await db('sensor_readings').select('*').orderBy('timestamp','desc').limit(limit).offset(offset);
  res.json(rows);
});

// GET /readings/:id
app.get('/readings/:id', async (req,res) => {
  const row = await db('sensor_readings').where({id: req.params.id}).first();
  if(!row) return res.status(404).json({error:'Not found'});
  res.json(row);
});

// POST /readings
app.post('/readings', async (req,res) => {
  const { device_id, type, value, unit, status } = req.body;
  const [record] = await db('sensor_readings').insert({
    device_id, type, value, unit, status, timestamp: new Date()
  }).returning(['id']);
  res.status(201).json(record);
});

// PUT /readings/:id
app.put('/readings/:id', async (req,res) => {
  const payload = req.body;
  await db('sensor_readings').where({id: req.params.id}).update(payload);
  res.json({ updated: req.params.id });
});

// DELETE /readings/:id
app.delete('/readings/:id', async (req,res) => {
  await db('sensor_readings').where({id: req.params.id}).del();
  res.status(204).end();
});

// health
app.get('/health', (_,res) => res.json({status: 'ok'}));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`API listening on ${port}`));
