import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { BADGES } from '../data/badges';
import { ACHIEVEMENTS } from '../data/achievements';
import { getLevelInfo } from '../utils/levelSystem';

const GameContext = createContext();

const INITIAL_STATE = {
  stars: 0,
  xp: 0,
  coins: 100,
  level: 1,
  streak: 0,
  lastLoginDate: null,
  totalQuizzes: 0,
  totalChallenges: 0,
  totalGames: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  perfectQuizzes: 0,
  unlockedBadges: [],
  unlockedAchievements: [],
  dailyRewardClaimed: false,
  dailyRewardDate: null,
  xpMultiplier: 1,
  completedLessons: [],
  completedQuizTopics: [],
  completedChallengeIds: [],
  bookmarkedLessons: [],
  favoriteChallenge: [],
  notes: {},
  quizHistory: [],
  challengeHistory: [],
  gameHighScores: {},
  loginDates: [],
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'ADD_STARS':
      return { ...state, stars: state.stars + action.payload };
    case 'ADD_XP': {
      const newXp = state.xp + Math.floor(action.payload * state.xpMultiplier);
      const newLevelInfo = getLevelInfo(newXp);
      return { ...state, xp: newXp, level: newLevelInfo.level };
    }
    case 'ADD_COINS':
      return { ...state, coins: state.coins + action.payload };
    case 'SPEND_COINS':
      return { ...state, coins: Math.max(0, state.coins - action.payload) };
    case 'INCREMENT_QUIZZES':
      return { ...state, totalQuizzes: state.totalQuizzes + 1 };
    case 'INCREMENT_CHALLENGES':
      return { ...state, totalChallenges: state.totalChallenges + 1 };
    case 'INCREMENT_GAMES':
      return { ...state, totalGames: state.totalGames + 1 };
    case 'ADD_CORRECT':
      return { ...state, correctAnswers: state.correctAnswers + (action.payload || 1) };
    case 'ADD_WRONG':
      return { ...state, wrongAnswers: state.wrongAnswers + (action.payload || 1) };
    case 'ADD_PERFECT_QUIZ':
      return { ...state, perfectQuizzes: state.perfectQuizzes + 1 };
    case 'UNLOCK_BADGE': {
      if (state.unlockedBadges.includes(action.payload)) return state;
      return { ...state, unlockedBadges: [...state.unlockedBadges, action.payload] };
    }
    case 'UNLOCK_ACHIEVEMENT': {
      if (state.unlockedAchievements.includes(action.payload)) return state;
      return { ...state, unlockedAchievements: [...state.unlockedAchievements, action.payload] };
    }
    case 'UPDATE_STREAK': {
      const today = new Date().toDateString();
      if (state.lastLoginDate === today) return state;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = state.lastLoginDate === yesterday ? state.streak + 1 : 1;
      return {
        ...state,
        streak: newStreak,
        lastLoginDate: today,
        loginDates: [...state.loginDates, today],
      };
    }
    case 'CLAIM_DAILY_REWARD': {
      const today = new Date().toDateString();
      return {
        ...state,
        dailyRewardClaimed: true,
        dailyRewardDate: today,
        coins: state.coins + action.payload.coins,
        stars: state.stars + action.payload.stars,
        xp: state.xp + action.payload.xp,
      };
    }
    case 'COMPLETE_LESSON': {
      if (state.completedLessons.includes(action.payload)) return state;
      return { ...state, completedLessons: [...state.completedLessons, action.payload] };
    }
    case 'COMPLETE_QUIZ_TOPIC': {
      if (state.completedQuizTopics.includes(action.payload)) return state;
      return { ...state, completedQuizTopics: [...state.completedQuizTopics, action.payload] };
    }
    case 'COMPLETE_CHALLENGE': {
      if (state.completedChallengeIds.includes(action.payload)) return state;
      return { ...state, completedChallengeIds: [...state.completedChallengeIds, action.payload] };
    }
    case 'TOGGLE_BOOKMARK': {
      const id = action.payload;
      const bookmarks = state.bookmarkedLessons.includes(id)
        ? state.bookmarkedLessons.filter(b => b !== id)
        : [...state.bookmarkedLessons, id];
      return { ...state, bookmarkedLessons: bookmarks };
    }
    case 'TOGGLE_FAVORITE_CHALLENGE': {
      const id = action.payload;
      const favs = state.favoriteChallenge.includes(id)
        ? state.favoriteChallenge.filter(f => f !== id)
        : [...state.favoriteChallenge, id];
      return { ...state, favoriteChallenge: favs };
    }
    case 'SAVE_NOTE':
      return { ...state, notes: { ...state.notes, [action.payload.id]: action.payload.text } };
    case 'ADD_QUIZ_HISTORY':
      return { ...state, quizHistory: [...state.quizHistory, action.payload] };
    case 'ADD_CHALLENGE_HISTORY':
      return { ...state, challengeHistory: [...state.challengeHistory, action.payload] };
    case 'SET_GAME_HIGH_SCORE': {
      const { gameId, score } = action.payload;
      const current = state.gameHighScores[gameId] || 0;
      if (score <= current) return state;
      return { ...state, gameHighScores: { ...state.gameHighScores, [gameId]: score } };
    }
    case 'SET_XP_MULTIPLIER':
      return { ...state, xpMultiplier: action.payload };
    case 'RESET_DAILY': {
      const today = new Date().toDateString();
      if (state.dailyRewardDate !== today) {
        return { ...state, dailyRewardClaimed: false };
      }
      return state;
    }
    case 'LOAD_STATE':
      return { ...INITIAL_STATE, ...action.payload };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE, () => {
    const saved = localStorage.getItem('creolab-game');
    return saved ? { ...INITIAL_STATE, ...JSON.parse(saved) } : INITIAL_STATE;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('creolab-game', JSON.stringify(state));
  }, [state]);

  // Check streak on mount
  useEffect(() => {
    dispatch({ type: 'UPDATE_STREAK' });
    dispatch({ type: 'RESET_DAILY' });
  }, []);

  // Check achievements after state changes
  const checkAchievements = useCallback(() => {
    ACHIEVEMENTS.forEach(achievement => {
      if (!state.unlockedAchievements.includes(achievement.id)) {
        if (achievement.condition(state)) {
          dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement.id });
        }
      }
    });
    BADGES.forEach(badge => {
      if (!state.unlockedBadges.includes(badge.id)) {
        if (badge.condition(state)) {
          dispatch({ type: 'UNLOCK_BADGE', payload: badge.id });
        }
      }
    });
  }, [state]);

  useEffect(() => {
    checkAchievements();
  }, [state.totalQuizzes, state.totalChallenges, state.stars, state.xp, state.streak, state.level, state.completedLessons.length, state.correctAnswers]);

  const addReward = (stars, xp, coins = 0) => {
    if (stars > 0) dispatch({ type: 'ADD_STARS', payload: stars });
    if (xp > 0) dispatch({ type: 'ADD_XP', payload: xp });
    if (coins > 0) dispatch({ type: 'ADD_COINS', payload: coins });
  };

  return (
    <GameContext.Provider value={{ state, dispatch, addReward }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
