const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  currentSkills: [{ type: String }],
  targetCareer: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' },
  gap: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
