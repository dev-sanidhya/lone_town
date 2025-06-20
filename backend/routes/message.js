const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const User = require('../models/User');

// Track message
router.post('/', async (req, res) => {
  const { matchId, sender, text, type, voiceUrl } = req.body;
  if (!matchId || !sender) return res.status(400).json({ error: 'matchId and sender required' });
  const match = await Match.findById(matchId);
  if (!match) return res.status(404).json({ error: 'Match not found' });
  // Find sender user
  const senderUser = await User.findOne({ email: sender }) || sender;
  // Store message
  const now = new Date();
  const msgObj = {
    sender: senderUser._id || senderUser,
    text: text || '',
    timestamp: now,
    length: (text || '').length,
    type: type || 'text',
    voiceUrl: voiceUrl || '',
  };
  match.messages.push(msgObj);
  match.messageCount = (match.messageCount || 0) + 1;
  // Response time tracking
  if (match.messages.length > 1) {
    const prevMsg = match.messages[match.messages.length - 2];
    match.responseTimes.push(now - prevMsg.timestamp);
  }
  // Check if within 48h window
  const within48h = (now - new Date(match.startedAt).getTime()) < 48 * 60 * 60 * 1000;
  if (match.messageCount >= 100 && within48h) {
    match.unlockedVideoCall = true;
  }
  await match.save();
  res.json({ message: 'Message tracked', messageCount: match.messageCount, unlockedVideoCall: match.unlockedVideoCall });
});

module.exports = router; 