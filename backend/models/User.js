const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  onboarding: {
    emotionalIntelligence: Number,
    psychologicalTraits: Object,
    behavioralPatterns: Object,
    relationshipValues: Object,
    // Add more as needed
  },
  state: {
    type: String,
    enum: ['available', 'matched', 'pinned', 'frozen'],
    default: 'available',
  },
  currentMatch: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', default: null },
  freezeUntil: { type: Date, default: null },
  messageCount: { type: Number, default: 0 },
  lastMessageAt: { type: Date, default: null },
  feedback: [{
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    reason: String,
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 