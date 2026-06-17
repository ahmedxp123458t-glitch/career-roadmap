const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

router.get('/:userId', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId }).populate('targetCareer');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const existing = await UserProfile.findOne({ userId: req.body.userId });
    if (existing) {
      Object.assign(existing, req.body);
      const saved = await existing.save();
      return res.json(saved);
    }
    const profile = new UserProfile(req.body);
    const saved = await profile.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
