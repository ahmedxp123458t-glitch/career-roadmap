const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  resources: [{ type: String }],
  duration: { type: String, default: '' },
});

const learningPathSchema = new mongoose.Schema({
  careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
  steps: [stepSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LearningPath', learningPathSchema);
