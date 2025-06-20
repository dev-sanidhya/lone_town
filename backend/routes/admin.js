const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.get('/analytics', async (req, res) => {
  const matches = await Match.find({});
  const total = matches.length;
  const successCount = matches.filter(m => m.outcome === 'success').length;
  const failCount = matches.filter(m => m.outcome === 'fail').length;
  const successRate = total ? Math.round((successCount / total) * 100) : 0;
  const avgMessages = total ? Math.round(matches.reduce((sum, m) => sum + (m.messageCount || 0), 0) / total) : 0;
  const allResponseTimes = matches.flatMap(m => m.responseTimes || []);
  const avgResponseTime = allResponseTimes.length ? Math.round(allResponseTimes.reduce((a, b) => a + b, 0) / allResponseTimes.length / 1000) : 0;
  res.json({ successRate, avgMessages, avgResponseTime, successCount, failCount });
});

module.exports = router; 