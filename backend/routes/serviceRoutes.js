const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
});

// Add new service
router.post('/', async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
});

// Edit service
router.put('/:id', async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete service
router.delete('/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted' });
});

module.exports = router;
