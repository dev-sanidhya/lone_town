const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save onboarding data
router.post('/', async (req, res) => {
  try {
    const { email, name, password, onboarding } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, password, onboarding });
    } else {
      user.onboarding = onboarding;
      user.name = name;
      user.password = password;
    }
    await user.save();
    res.status(200).json({ message: 'Onboarding data saved', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 