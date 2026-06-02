import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { getLevelInfo } from '../utils/levelSystem';
import { PYTHON_FACTS, MOTIVATIONAL_QUOTES } from '../data/lessons';
import PageWrapper from '../components/layout/PageWrapper';
import { FiStar, FiAward, FiBookOpen, FiCode, FiActivity, FiTrendingUp, FiGift } from 'react-icons/fi';

export default function DashboardPage() {
  const { user } = useAuth();
  const { state: gameState, dispatch, addReward } = useGame();
  const [fact, setFact] = useState('');
  const [quoteObj, setQuoteObj] = useState({ quote: '', author: '' });

  // Get current level details
  const levelInfo = getLevelInfo(gameState.xp);

  useEffect(() => {
    // Select daily fact and quote
    const factIdx = Math.floor(Math.random() * PYTHON_FACTS.length);
    setFact(PYTHON_FACTS[factIdx]);

    const quoteIdx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuoteObj(MOTIVATIONAL_QUOTES[quoteIdx]);
  }, []);

  const handleClaimDaily = () => {
    if (gameState.dailyRewardClaimed) return;
    // Dispatch claim daily reward: +10 coins, +1 star, +25 XP
    dispatch({ type: 'CLAIM_DAILY_REWARD', payload: { coins: 10, stars: 1, xp: 25 } });
  };

  return (
    <PageWrapper className="flex flex-col gap-8 pb-12">
      {/* Welcome Hero */}
      <div className="glass-card p-6 sm:p-8 border-border-color shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
        <div className="text-left flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold flex items-center gap-2">
            Welcome back, {user?.username || 'Learner'}! <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-text-secondary">
            Level {gameState.level} — <span className="font-semibold text-primary">{levelInfo.title}</span>
          </p>
          <div className="flex flex-wrap gap-3 mt-2 text-xs">
            <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full font-bold">
              📚 {gameState.completedLessons.length} Lessons Finished
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full font-bold">
              📝 {gameState.totalQuizzes} Quizzes Taken
            </span>
            <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-full font-bold">
              💻 {gameState.totalChallenges} Challenges Solved
            </span>
          </div>
        </div>

        {/* Action card */}
        <div className="flex gap-4">
          <Link to="/learning-path" className="btn-primary py-3 px-6 text-sm rounded-xl flex items-center gap-2">
            <FiBookOpen />
            Resume Path
          </Link>
          <Link to="/games" className="btn-secondary py-3 px-6 text-sm rounded-xl flex items-center gap-2">
            Play Game
          </Link>
        </div>
      </div>

      {/* Grid of level progress & daily reward */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Level & XP card */}
        <div className="stat-card lg:col-span-2 flex flex-col justify-between gap-6 text-left">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiAward className="text-primary" /> Level Progress
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Earn XP in lessons, quizzes, and challenges to level up
            </p>
          </div>

          <div className="flex items-center gap-4 bg-bg-secondary p-4 rounded-xl border border-border-color">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl font-black text-primary">
              {gameState.level}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                <span>XP: {levelInfo.xpInCurrentLevel} / {levelInfo.xpNeededForNext}</span>
                <span>{Math.round(levelInfo.progress)}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${levelInfo.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-text-muted">
            Total XP earned: <span className="font-bold text-text-primary">{gameState.xp} XP</span>.
            Next Level requires <span className="font-bold text-text-primary">{levelInfo.xpNeededForNext - levelInfo.xpInCurrentLevel} XP</span>.
          </div>
        </div>

        {/* Daily reward & Streak */}
        <div className="stat-card flex flex-col justify-between gap-4 text-left">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiGift className="text-accent" /> Daily Quest
            </h3>
            <span className="text-xs font-semibold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
              🔥 {gameState.streak} Day Streak
            </span>
          </div>

          <p className="text-sm text-text-secondary">
            Log in every day to claim your daily rewards! Claiming awards stars, coins, and XP.
          </p>

          <button
            onClick={handleClaimDaily}
            disabled={gameState.dailyRewardClaimed}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
              gameState.dailyRewardClaimed
                ? 'bg-bg-secondary text-text-muted border border-border-color cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {gameState.dailyRewardClaimed ? 'Claimed Today ✓' : 'Claim Daily Reward (+10 🪙)'}
          </button>
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div>
        <h3 className="text-xl font-bold text-left mb-6">Your Stats Showcase</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="stat-card text-center flex flex-col gap-2">
            <span className="text-3xl">⭐</span>
            <p className="text-2xl font-black">{gameState.stars}</p>
            <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Total Stars</p>
          </div>
          <div className="stat-card text-center flex flex-col gap-2">
            <span className="text-3xl">🪙</span>
            <p className="text-2xl font-black">{gameState.coins}</p>
            <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Coins Balance</p>
          </div>
          <div className="stat-card text-center flex flex-col gap-2">
            <span className="text-3xl">🏅</span>
            <p className="text-2xl font-black">{gameState.unlockedBadges.length}</p>
            <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Badges Earned</p>
          </div>
          <div className="stat-card text-center flex flex-col gap-2">
            <span className="text-3xl">🏆</span>
            <p className="text-2xl font-black">{gameState.unlockedAchievements.length}</p>
            <p className="text-xs text-text-muted uppercase font-bold tracking-wider">Achievements</p>
          </div>
        </div>
      </div>

      {/* Python Fact & Developer Quote */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Python Fact Card */}
        <div className="glass-card p-6 border-border-color text-left flex flex-col gap-3 relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
          <h4 className="font-extrabold text-primary flex items-center gap-1">
            🐍 Python Fact of the Day
          </h4>
          <p className="text-text-primary text-base font-semibold leading-relaxed">
            {fact || "Python is a powerful language that is easy to learn and write!"}
          </p>
        </div>

        {/* Developer Quote Card */}
        <div className="glass-card p-6 border-border-color text-left flex flex-col justify-between gap-4 bg-gradient-to-br from-accent/5 to-transparent">
          <div>
            <span className="text-text-muted text-3xl font-serif">“</span>
            <p className="text-text-secondary italic text-sm mt-[-10px]">
              {quoteObj.quote}
            </p>
          </div>
          <p className="text-xs text-text-muted text-right font-semibold">
            — {quoteObj.author}
          </p>
        </div>
      </div>

      {/* Dashboard Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link to="/learning-path" className="stat-card card-hover text-left flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-bold flex items-center gap-2 text-primary">
              <FiBookOpen /> Learning Roadmaps
            </h4>
            <p className="text-xs text-text-muted mt-1">
              Explore 4 paths with interactive vertical roadmaps.
            </p>
          </div>
          <span className="text-xs text-primary font-bold">Start Learning &rarr;</span>
        </Link>

        <Link to="/quiz" className="stat-card card-hover text-left flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-bold flex items-center gap-2 text-emerald-500">
              <FiCode /> Quizzes & MCQ
            </h4>
            <p className="text-xs text-text-muted mt-1">
              400+ interactive quizzes with circular count timers.
            </p>
          </div>
          <span className="text-xs text-emerald-500 font-bold">Solve Quizzes &rarr;</span>
        </Link>

        <Link to="/challenges" className="stat-card card-hover text-left flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-bold flex items-center gap-2 text-indigo-500">
              <FiActivity /> Coding Challenges
            </h4>
            <p className="text-xs text-text-muted mt-1">
              Real code challenges evaluated inside Monaco editor.
            </p>
          </div>
          <span className="text-xs text-indigo-500 font-bold">Solve Arena &rarr;</span>
        </Link>
      </div>
    </PageWrapper>
  );
}
