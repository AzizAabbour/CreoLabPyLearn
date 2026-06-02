export const BADGES = [
  // Quiz badges
  { id: 'first-quiz', name: 'First Quiz', icon: '🎯', description: 'Complete your first quiz', category: 'quiz', rarity: 'common', condition: s => s.totalQuizzes >= 1 },
  { id: 'quiz-5', name: 'Quiz Enthusiast', icon: '📝', description: 'Complete 5 quizzes', category: 'quiz', rarity: 'common', condition: s => s.totalQuizzes >= 5 },
  { id: 'quiz-25', name: 'Quiz Master', icon: '🏅', description: 'Complete 25 quizzes', category: 'quiz', rarity: 'rare', condition: s => s.totalQuizzes >= 25 },
  { id: 'quiz-50', name: 'Quiz King', icon: '👑', description: 'Complete 50 quizzes', category: 'quiz', rarity: 'epic', condition: s => s.totalQuizzes >= 50 },
  { id: 'quiz-100', name: 'Quiz Legend', icon: '🏆', description: 'Complete 100 quizzes', category: 'quiz', rarity: 'legendary', condition: s => s.totalQuizzes >= 100 },
  { id: 'perfect-quiz', name: 'Perfectionist', icon: '💯', description: 'Get a perfect score on a quiz', category: 'quiz', rarity: 'rare', condition: s => s.perfectQuizzes >= 1 },
  { id: 'perfect-10', name: 'Flawless', icon: '✨', description: 'Get 10 perfect quiz scores', category: 'quiz', rarity: 'epic', condition: s => s.perfectQuizzes >= 10 },

  // Coding badges
  { id: 'first-challenge', name: 'Code Newbie', icon: '💻', description: 'Complete your first coding challenge', category: 'coding', rarity: 'common', condition: s => s.totalChallenges >= 1 },
  { id: 'challenge-10', name: 'Code Warrior', icon: '⚔️', description: 'Complete 10 coding challenges', category: 'coding', rarity: 'rare', condition: s => s.totalChallenges >= 10 },
  { id: 'challenge-25', name: 'Code Champion', icon: '🛡️', description: 'Complete 25 coding challenges', category: 'coding', rarity: 'epic', condition: s => s.totalChallenges >= 25 },
  { id: 'challenge-50', name: 'Coding Legend', icon: '🌟', description: 'Complete 50 coding challenges', category: 'coding', rarity: 'legendary', condition: s => s.totalChallenges >= 50 },

  // Stars badges
  { id: 'stars-50', name: 'Star Collector', icon: '⭐', description: 'Earn 50 stars', category: 'stars', rarity: 'common', condition: s => s.stars >= 50 },
  { id: 'stars-200', name: 'Star Hunter', icon: '🌟', description: 'Earn 200 stars', category: 'stars', rarity: 'rare', condition: s => s.stars >= 200 },
  { id: 'stars-500', name: 'Stargazer', icon: '💫', description: 'Earn 500 stars', category: 'stars', rarity: 'epic', condition: s => s.stars >= 500 },
  { id: 'stars-1000', name: 'Supernova', icon: '🌠', description: 'Earn 1000 stars', category: 'stars', rarity: 'legendary', condition: s => s.stars >= 1000 },

  // Streak badges
  { id: 'streak-3', name: 'Consistent', icon: '🔥', description: 'Maintain a 3-day streak', category: 'streak', rarity: 'common', condition: s => s.streak >= 3 },
  { id: 'streak-7', name: 'Dedicated', icon: '🔥', description: 'Maintain a 7-day streak', category: 'streak', rarity: 'rare', condition: s => s.streak >= 7 },
  { id: 'streak-14', name: 'Unstoppable', icon: '🔥', description: 'Maintain a 14-day streak', category: 'streak', rarity: 'epic', condition: s => s.streak >= 14 },
  { id: 'streak-30', name: 'Legendary Streak', icon: '🔥', description: 'Maintain a 30-day streak', category: 'streak', rarity: 'legendary', condition: s => s.streak >= 30 },

  // Level badges
  { id: 'level-5', name: 'Rising Star', icon: '📈', description: 'Reach level 5', category: 'level', rarity: 'common', condition: s => s.level >= 5 },
  { id: 'level-10', name: 'Junior Dev', icon: '🎖️', description: 'Reach level 10', category: 'level', rarity: 'rare', condition: s => s.level >= 10 },
  { id: 'level-20', name: 'Intermediate', icon: '🏆', description: 'Reach level 20', category: 'level', rarity: 'epic', condition: s => s.level >= 20 },
  { id: 'level-50', name: 'Python Master', icon: '🐍', description: 'Reach level 50', category: 'level', rarity: 'legendary', condition: s => s.level >= 50 },

  // Learning badges
  { id: 'lesson-1', name: 'First Lesson', icon: '📖', description: 'Complete your first lesson', category: 'learning', rarity: 'common', condition: s => s.completedLessons.length >= 1 },
  { id: 'lesson-10', name: 'Bookworm', icon: '📚', description: 'Complete 10 lessons', category: 'learning', rarity: 'rare', condition: s => s.completedLessons.length >= 10 },
  { id: 'lesson-20', name: 'Scholar', icon: '🎓', description: 'Complete 20 lessons', category: 'learning', rarity: 'epic', condition: s => s.completedLessons.length >= 20 },

  // Game badges
  { id: 'first-game', name: 'Player One', icon: '🎮', description: 'Play your first mini-game', category: 'games', rarity: 'common', condition: s => s.totalGames >= 1 },
  { id: 'game-10', name: 'Gamer', icon: '🕹️', description: 'Play 10 mini-games', category: 'games', rarity: 'rare', condition: s => s.totalGames >= 10 },

  // Special/Secret badges
  { id: 'bug-hunter', name: 'Bug Hunter', icon: '🐛', description: 'Fix 10 bugs in Bug Fixer game', category: 'secret', rarity: 'epic', condition: s => (s.gameHighScores['bug-fixer'] || 0) >= 10 },
  { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', description: 'Score 100+ in Speed Coding', category: 'secret', rarity: 'epic', condition: s => (s.gameHighScores['speed-coding'] || 0) >= 100 },
  { id: 'correct-100', name: 'Accuracy King', icon: '🎯', description: 'Answer 100 questions correctly', category: 'secret', rarity: 'rare', condition: s => s.correctAnswers >= 100 },
  { id: 'xp-10000', name: 'XP Hoarder', icon: '💎', description: 'Earn 10,000 XP', category: 'secret', rarity: 'legendary', condition: s => s.xp >= 10000 },
];

export const BADGE_CATEGORIES = [
  { id: 'all', name: 'All Badges', icon: '🏅' },
  { id: 'quiz', name: 'Quiz', icon: '📝' },
  { id: 'coding', name: 'Coding', icon: '💻' },
  { id: 'stars', name: 'Stars', icon: '⭐' },
  { id: 'streak', name: 'Streak', icon: '🔥' },
  { id: 'level', name: 'Level', icon: '📈' },
  { id: 'learning', name: 'Learning', icon: '📖' },
  { id: 'games', name: 'Games', icon: '🎮' },
  { id: 'secret', name: 'Secret', icon: '🔮' },
];

export const RARITY_COLORS = {
  common: { bg: '#e2e8f0', text: '#475569', glow: 'rgba(71, 85, 105, 0.3)' },
  rare: { bg: '#dbeafe', text: '#2563eb', glow: 'rgba(37, 99, 235, 0.3)' },
  epic: { bg: '#f3e8ff', text: '#7c3aed', glow: 'rgba(124, 58, 237, 0.4)' },
  legendary: { bg: '#fef3c7', text: '#d97706', glow: 'rgba(217, 119, 6, 0.5)' },
};
