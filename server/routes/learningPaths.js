const express = require('express');
const router = express.Router();
const LearningPath = require('../models/LearningPath');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.careerId) filter.careerId = req.query.careerId;
    const paths = await LearningPath.find(filter).populate('careerId');
    res.json(paths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id).populate('careerId');
    if (!path) return res.status(404).json({ message: 'Learning path not found' });
    res.json(path);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const path = new LearningPath(req.body);
    const saved = await path.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const path = await LearningPath.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(path);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await LearningPath.findByIdAndDelete(req.params.id);
    res.json({ message: 'Learning path deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
