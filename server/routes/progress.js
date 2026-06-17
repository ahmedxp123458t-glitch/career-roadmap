const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.pathId) filter.pathId = req.query.pathId;
    const progress = await Progress.find(filter).populate('pathId');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const existing = await Progress.findOne({ userId: req.body.userId, pathId: req.body.pathId });
    if (existing) {
      Object.assign(existing, req.body);
      existing.updatedAt = Date.now();
      const saved = await existing.save();
      return res.json(saved);
    }
    const prog = new Progress(req.body);
    const saved = await prog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const prog = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(prog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
