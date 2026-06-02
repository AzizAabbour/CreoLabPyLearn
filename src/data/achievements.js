export const ACHIEVEMENTS = [
  // Quiz achievements
  { id: 'ach-quiz-1', name: 'Quiz Starter', description: 'Complete your first quiz', icon: '🎯', xpReward: 50, tier: 1, condition: s => s.totalQuizzes >= 1 },
  { id: 'ach-quiz-10', name: 'Quiz Apprentice', description: 'Complete 10 quizzes', icon: '📝', xpReward: 100, tier: 2, condition: s => s.totalQuizzes >= 10 },
  { id: 'ach-quiz-25', name: 'Quiz Expert', description: 'Complete 25 quizzes', icon: '🏅', xpReward: 250, tier: 3, condition: s => s.totalQuizzes >= 25 },
  { id: 'ach-quiz-50', name: 'Quiz Conqueror', description: 'Complete 50 quizzes', icon: '👑', xpReward: 500, tier: 4, condition: s => s.totalQuizzes >= 50 },

  // Stars achievements
  { id: 'ach-stars-25', name: 'Star Seeker', description: 'Earn 25 stars', icon: '⭐', xpReward: 50, tier: 1, condition: s => s.stars >= 25 },
  { id: 'ach-stars-100', name: 'Star Collector', description: 'Earn 100 stars', icon: '🌟', xpReward: 150, tier: 2, condition: s => s.stars >= 100 },
  { id: 'ach-stars-500', name: 'Star Master', description: 'Earn 500 stars', icon: '💫', xpReward: 300, tier: 3, condition: s => s.stars >= 500 },
  { id: 'ach-stars-1000', name: 'Supernova', description: 'Earn 1000 stars', icon: '🌠', xpReward: 1000, tier: 4, condition: s => s.stars >= 1000 },

  // Challenge achievements
  { id: 'ach-challenge-1', name: 'Code Initiate', description: 'Complete first coding challenge', icon: '💻', xpReward: 50, tier: 1, condition: s => s.totalChallenges >= 1 },
  { id: 'ach-challenge-10', name: 'Code Warrior', description: 'Complete 10 coding challenges', icon: '⚔️', xpReward: 150, tier: 2, condition: s => s.totalChallenges >= 10 },
  { id: 'ach-challenge-25', name: 'Code Hero', description: 'Complete 25 coding challenges', icon: '🦸', xpReward: 350, tier: 3, condition: s => s.totalChallenges >= 25 },
  { id: 'ach-challenge-50', name: 'Code Legend', description: 'Complete 50 coding challenges', icon: '🏆', xpReward: 750, tier: 4, condition: s => s.totalChallenges >= 50 },

  // Streak achievements
  { id: 'ach-streak-3', name: 'Getting Started', description: 'Maintain a 3-day streak', icon: '🔥', xpReward: 50, tier: 1, condition: s => s.streak >= 3 },
  { id: 'ach-streak-7', name: 'One Week Strong', description: 'Maintain a 7-day streak', icon: '🔥', xpReward: 150, tier: 2, condition: s => s.streak >= 7 },
  { id: 'ach-streak-14', name: 'Two Weeks Running', description: 'Maintain a 14-day streak', icon: '🔥', xpReward: 300, tier: 3, condition: s => s.streak >= 14 },
  { id: 'ach-streak-30', name: 'Monthly Marathon', description: 'Maintain a 30-day streak', icon: '🔥', xpReward: 1000, tier: 4, condition: s => s.streak >= 30 },

  // Learning path achievements
  { id: 'ach-lesson-5', name: 'Quick Learner', description: 'Complete 5 lessons', icon: '📖', xpReward: 75, tier: 1, condition: s => s.completedLessons.length >= 5 },
  { id: 'ach-lesson-15', name: 'Knowledge Seeker', description: 'Complete 15 lessons', icon: '📚', xpReward: 200, tier: 2, condition: s => s.completedLessons.length >= 15 },
  { id: 'ach-lesson-all', name: 'Complete Scholar', description: 'Complete all lessons', icon: '🎓', xpReward: 1000, tier: 4, condition: s => s.completedLessons.length >= 28 },

  // Beginner path
  { id: 'ach-beginner-path', name: 'Python Beginner', description: 'Complete the Beginner learning path', icon: '🌱', xpReward: 200, tier: 2,
    condition: s => {
      const beginnerIds = ['variables','data-types','operators','input-output','conditions','loops','functions'];
      return beginnerIds.every(id => s.completedLessons.includes(id));
    }
  },

  // Level achievements
  { id: 'ach-level-10', name: 'Junior Dev', description: 'Reach level 10', icon: '📈', xpReward: 200, tier: 2, condition: s => s.level >= 10 },
  { id: 'ach-level-25', name: 'Pro Coder', description: 'Reach level 25', icon: '🚀', xpReward: 500, tier: 3, condition: s => s.level >= 25 },
  { id: 'ach-level-50', name: 'Python Master', description: 'Reach level 50', icon: '🐍', xpReward: 1500, tier: 4, condition: s => s.level >= 50 },

  // Accuracy achievements
  { id: 'ach-correct-50', name: 'Sharp Mind', description: 'Answer 50 questions correctly', icon: '🧠', xpReward: 100, tier: 2, condition: s => s.correctAnswers >= 50 },
  { id: 'ach-correct-200', name: 'Genius', description: 'Answer 200 questions correctly', icon: '🧠', xpReward: 400, tier: 3, condition: s => s.correctAnswers >= 200 },

  // Games achievements
  { id: 'ach-games-5', name: 'Fun Learner', description: 'Play 5 mini-games', icon: '🎮', xpReward: 75, tier: 1, condition: s => s.totalGames >= 5 },
  { id: 'ach-games-20', name: 'Game Master', description: 'Play 20 mini-games', icon: '🕹️', xpReward: 250, tier: 3, condition: s => s.totalGames >= 20 },

  // Perfect scores
  { id: 'ach-perfect-5', name: 'Perfectionist', description: 'Get 5 perfect quiz scores', icon: '💯', xpReward: 200, tier: 2, condition: s => s.perfectQuizzes >= 5 },
  { id: 'ach-perfect-20', name: 'Flawless', description: 'Get 20 perfect quiz scores', icon: '✨', xpReward: 750, tier: 4, condition: s => s.perfectQuizzes >= 20 },

  // Secret achievements
  { id: 'ach-secret-night', name: 'Night Owl', description: 'Study at midnight', icon: '🦉', xpReward: 100, tier: 2, hidden: true, condition: () => new Date().getHours() === 0 },
  { id: 'ach-secret-early', name: 'Early Bird', description: 'Study at 6 AM', icon: '🐦', xpReward: 100, tier: 2, hidden: true, condition: () => new Date().getHours() === 6 },
  { id: 'ach-secret-coins', name: 'Rich Coder', description: 'Accumulate 1000 coins', icon: '💰', xpReward: 200, tier: 3, hidden: true, condition: s => s.coins >= 1000 },

  // XP milestones
  { id: 'ach-xp-1000', name: 'XP Collector', description: 'Earn 1,000 XP', icon: '💎', xpReward: 100, tier: 1, condition: s => s.xp >= 1000 },
  { id: 'ach-xp-5000', name: 'XP Hunter', description: 'Earn 5,000 XP', icon: '💎', xpReward: 300, tier: 2, condition: s => s.xp >= 5000 },
  { id: 'ach-xp-25000', name: 'XP Legend', description: 'Earn 25,000 XP', icon: '💎', xpReward: 1000, tier: 4, condition: s => s.xp >= 25000 },

  // Badge collection
  { id: 'ach-badges-5', name: 'Badge Collector', description: 'Earn 5 badges', icon: '🏅', xpReward: 75, tier: 1, condition: s => s.unlockedBadges.length >= 5 },
  { id: 'ach-badges-15', name: 'Badge Hunter', description: 'Earn 15 badges', icon: '🎖️', xpReward: 300, tier: 3, condition: s => s.unlockedBadges.length >= 15 },
  { id: 'ach-badges-all', name: 'Badge Master', description: 'Earn all badges', icon: '🏆', xpReward: 2000, tier: 4, condition: s => s.unlockedBadges.length >= 34 },
];
