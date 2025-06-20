function scoreCompatibility(userA, userB) {
  let score = 0;
  // Example: simple string similarity or number difference for demo
  if (!userA.onboarding || !userB.onboarding) return 0;
  // Emotional Intelligence (number)
  if (userA.onboarding.emotionalIntelligence && userB.onboarding.emotionalIntelligence) {
    score += 30 - Math.abs(Number(userA.onboarding.emotionalIntelligence) - Number(userB.onboarding.emotionalIntelligence));
  }
  // Psychological Traits (string similarity)
  if (userA.onboarding.psychologicalTraits && userB.onboarding.psychologicalTraits) {
    score += userA.onboarding.psychologicalTraits === userB.onboarding.psychologicalTraits ? 25 : 0;
  }
  // Behavioral Patterns (string similarity)
  if (userA.onboarding.behavioralPatterns && userB.onboarding.behavioralPatterns) {
    score += userA.onboarding.behavioralPatterns === userB.onboarding.behavioralPatterns ? 25 : 0;
  }
  // Relationship Values (string similarity)
  if (userA.onboarding.relationshipValues && userB.onboarding.relationshipValues) {
    score += userA.onboarding.relationshipValues === userB.onboarding.relationshipValues ? 20 : 0;
  }
  return score;
}

function findBestMatch(currentUser, allUsers) {
  let bestMatch = null;
  let bestScore = -1;
  for (const user of allUsers) {
    if (user._id.equals(currentUser._id)) continue;
    if (user.state !== 'available') continue;
    const score = scoreCompatibility(currentUser, user);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = user;
    }
  }
  return bestMatch;
}

module.exports = { findBestMatch }; 