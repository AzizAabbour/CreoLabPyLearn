import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import PageWrapper from '../components/layout/PageWrapper';
import { FiCalendar, FiGift, FiAward, FiHeart, FiCheckCircle } from 'react-icons/fi';
import confetti from 'canvas-confetti';

const WEEKLY_REWARDS = [
  { day: 1, reward: '+10 Coins 🪙', value: 10 },
  { day: 2, reward: '+15 Coins 🪙', value: 15 },
  { day: 3, reward: '+20 Coins 🪙', value: 20 },
  { day: 4, reward: '+25 Coins 🪙', value: 25 },
  { day: 5, reward: '+30 Coins 🪙', value: 30 },
  { day: 6, reward: '+40 Coins 🪙 & +1 Star ⭐', value: 40, stars: 1 },
  { day: 7, reward: '+50 Coins 🪙 & +2 Stars ⭐', value: 50, stars: 2 }
];

export default function DailyPage() {
  const { state: gameState, dispatch, addReward } = useGame();
  const navigate = useNavigate();

  const handleClaimReward = () => {
    if (gameState.dailyRewardClaimed) return;
    dispatch({ type: 'CLAIM_DAILY_REWARD', payload: { coins: 15, stars: 1, xp: 20 } });
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Generate GitHub style calendar heatmap data for the past 30 days
  const getHeatmapDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toDateString();
      const isActive = gameState.loginDates.includes(dateStr) || gameState.lastLoginDate === dateStr;
      days.push({
        date: d,
        dateString: dateStr,
        active: isActive
      });
    }
    return days;
  };

  const heatmapDays = getHeatmapDays();

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16 text-left">
      {/* Header */}
      <div className="text-left">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          🎁 Daily Quests & Rewards
        </h2>
        <p className="text-text-secondary mt-1">
          Maintain your learning streak, claim login rewards, and track your coding activity heatmap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Streak & Daily Login Reward */}
        <div className="stat-card lg:col-span-2 flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiGift className="text-accent" /> Login Streak Calendar
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Current Streak: <span className="font-bold text-amber-500">🔥 {gameState.streak} days</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5">
            {WEEKLY_REWARDS.map((r) => {
              // Mark day as completed if streak is equal or higher
              const completed = gameState.streak >= r.day;
              return (
                <div
                  key={r.day}
                  className={`p-3 rounded-xl border text-center flex flex-col justify-between gap-2 shadow-sm ${
                    completed
                      ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                      : 'border-border-color bg-bg-secondary'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">Day {r.day}</span>
                  <span className="text-[11px] font-bold leading-tight">{r.reward}</span>
                  {completed ? (
                    <span className="text-[10px] font-bold bg-emerald-500/10 py-0.5 rounded-full flex items-center justify-center gap-0.5">
                      ✓ Done
                    </span>
                  ) : (
                    <span className="text-[10px] text-text-muted">Locked</span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleClaimReward}
            disabled={gameState.dailyRewardClaimed}
            className={`py-3.5 rounded-xl font-bold w-full flex items-center justify-center gap-2 transition-all duration-200 ${
              gameState.dailyRewardClaimed
                ? 'bg-bg-secondary text-text-muted border border-border-color cursor-not-allowed'
                : 'btn-primary shadow-md hover:scale-101'
            }`}
          >
            {gameState.dailyRewardClaimed ? (
              <>
                <FiCheckCircle /> Daily Reward Claimed ✓
              </>
            ) : (
              'Claim Daily Reward (+15 Coins, +1 Star, +20 XP)'
            )}
          </button>
        </div>

        {/* Daily Quiz challenge shortcut */}
        <div className="stat-card flex flex-col justify-between gap-4 text-left">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiAward className="text-primary" /> Daily Coding Quest
            </h3>
            <p className="text-xs text-text-muted mt-0.5">Refreshes every 24 hours</p>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Take a 10-question random Python quiz to double your streak multiplier and earn bonus stars!
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="btn-primary py-3 rounded-xl font-bold w-full text-center"
          >
            Start Daily Quiz
          </button>
        </div>
      </div>

      {/* GitHub-style Contribution Heatmap */}
      <div className="stat-card">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
          <FiCalendar className="text-primary" /> Activity Heatmap
        </h3>
        <p className="text-xs text-text-muted mb-6 mt-[-10px]">
          Your study activity logs for the past 30 days (colored blocks represent active coding sessions).
        </p>

        {/* Heatmap blocks */}
        <div className="flex flex-wrap gap-2 justify-start sm:justify-center p-4 bg-bg-secondary border border-border-color rounded-2xl">
          {heatmapDays.map((day, idx) => (
            <div
              key={idx}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex flex-col items-center justify-center text-[8px] font-bold border transition-all duration-150 ${
                day.active
                  ? 'bg-emerald-500 border-emerald-400 text-white scale-105 shadow-sm'
                  : 'bg-bg-card border-border-color text-text-muted hover:border-text-muted/40'
              }`}
              title={day.dateString}
            >
              <span>{day.date.getDate()}</span>
              <span className="text-[6px] uppercase font-normal">{day.date.toLocaleString('default', { month: 'short' })}</span>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
