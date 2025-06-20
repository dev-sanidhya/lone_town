const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Match = require('../models/Match');
const { findBestMatch } = require('../utils/matchmaking');

// Get today's match
router.get('/daily', async (req, res) => {
  // For demo, use email from query (replace with auth in production)
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const user = await User.findOne({ email }).populate('currentMatch');
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.state === 'matched' && user.currentMatch) {
    const match = await Match.findById(user.currentMatch).populate('user1 user2');
    return res.json({ match });
  }
  // Find best match
  const allUsers = await User.find({});
  const bestMatch = findBestMatch(user, allUsers);
  if (!bestMatch) return res.json({ match: null, message: 'No available match found' });
  // Create new match
  const match = new Match({ user1: user._id, user2: bestMatch._id });
  await match.save();
  user.state = 'matched';
  user.currentMatch = match._id;
  bestMatch.state = 'matched';
  bestMatch.currentMatch = match._id;
  await user.save();
  await bestMatch.save();
  return res.json({ match });
});

// Unpin match
router.post('/unpin', async (req, res) => {
  // For demo, use email from body (replace with auth in production)
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const user = await User.findOne({ email }).populate('currentMatch');
  if (!user || !user.currentMatch) return res.status(404).json({ error: 'No active match' });
  const match = await Match.findById(user.currentMatch);
  if (!match) return res.status(404).json({ error: 'Match not found' });
  // Find the other user
  const otherUserId = match.user1.equals(user._id) ? match.user2 : match.user1;
  const otherUser = await User.findById(otherUserId);
  // Set states
  user.state = 'frozen';
  user.freezeUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  user.currentMatch = null;
  await user.save();
  if (otherUser) {
    otherUser.state = 'available';
    otherUser.currentMatch = null;
    await otherUser.save();
    // Optionally, set a 2h delay for new match (not implemented here)
  }
  match.state = 'ended';
  match.endedAt = new Date();
  await match.save();
  res.json({ message: 'Unpinned. You are now in a 24h reflection freeze.' });
});

// Submit feedback
router.get('/feedback', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  // Find last ended match
  const lastMatch = await Match.findOne({ $or: [{ user1: user._id }, { user2: user._id }], state: 'ended' }).sort({ endedAt: -1 });
  if (!lastMatch || !lastMatch.feedback) {
    return res.json({ feedback: 'No feedback available for your last match.' });
  }
  res.json({ feedback: lastMatch.feedback });
});

module.exports = router; 