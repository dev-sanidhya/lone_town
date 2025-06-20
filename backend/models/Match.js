const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  timestamp: { type: Date, default: Date.now },
  length: Number,
  type: { type: String, enum: ['text', 'voice'], default: 'text' },
  voiceUrl: String,
});

const matchSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state: {
    type: String,
    enum: ['active', 'unpinned', 'ended'],
    default: 'active',
  },
  pinned: { type: Boolean, default: true },
  messageCount: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  unlockedVideoCall: { type: Boolean, default: false },
  endedAt: { type: Date, default: null },
  feedback: String,
  // Analytics
  messages: [messageSchema],
  responseTimes: [Number],
  outcome: { type: String, enum: ['success', 'fail', ''], default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema); 