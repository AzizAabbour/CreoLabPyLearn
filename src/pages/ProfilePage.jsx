import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { BADGES } from '../data/badges';
import PageWrapper from '../components/layout/PageWrapper';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { FiEdit3, FiAward, FiBook, FiCheck } from 'react-icons/fi';

const MOCK_CHART_DATA = [
  { day: 'Mon', xp: 50 },
  { day: 'Tue', xp: 120 },
  { day: 'Wed', xp: 80 },
  { day: 'Thu', xp: 150 },
  { day: 'Fri', xp: 200 },
  { day: 'Sat', xp: 90 },
  { day: 'Sun', xp: 140 },
];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { state: gameState } = useGame();
  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState(user?.bio || '');

  const handleSaveBio = () => {
    updateProfile({ bio: bioInput });
    setIsEditing(false);
  };

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16 text-left">
      {/* Profile Header */}
      <div className="glass-card p-6 sm:p-8 border-border-color shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
        {/* Avatar display */}
        <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center text-5xl shadow-md">
          {user?.avatar || '🐍'}
        </div>

        {/* Profile info details */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-extrabold text-text-primary">
              {user?.username || 'Learner'}
            </h2>
            <span className="level-badge level-intermediate">
              Lvl {gameState.level}
            </span>
          </div>

          <p className="text-xs text-text-muted mt-[-4px]">
            Joined CreoLab on {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : new Date().toLocaleDateString()}
          </p>

          {/* Bio section */}
          <div className="mt-2 max-w-xl">
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="input-field text-sm leading-relaxed p-3.5"
                  placeholder="Tell us about yourself..."
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary py-1 px-3 text-xs rounded-lg font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveBio}
                    className="btn-primary py-1 px-3 text-xs rounded-lg font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                <span>{user?.bio || 'No biography set.'}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-text-muted hover:text-primary transition-colors focus:outline-none"
                  title="Edit Biography"
                >
                  <FiEdit3 size={14} />
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Level Circle stats */}
        <div className="flex flex-col items-center justify-center p-4 bg-bg-secondary rounded-2xl border border-border-color shadow-inner">
          <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Level</span>
          <span className="text-4xl font-black text-primary mt-1">{gameState.level}</span>
        </div>
      </div>

      {/* Grid of details: Analytics Chart & Quick statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Activity Area Chart */}
        <div className="stat-card lg:col-span-2 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FiAward className="text-primary" /> Weekly XP Activity
            </h3>
            <p className="text-xs text-text-muted mt-0.5">Your study activity metrics over the past 7 days</p>
          </div>
          <div className="h-56 w-full mt-2 font-sans text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Area type="monotone" dataKey="xp" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Summary cards */}
        <div className="stat-card flex flex-col gap-4 justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FiBook className="text-accent" /> Learning Log
          </h3>
          <div className="flex flex-col gap-3 text-sm font-semibold">
            <div className="flex justify-between items-center py-2 border-b border-border-color/50">
              <span className="text-text-secondary">Streak:</span>
              <span className="text-amber-500 font-bold">🔥 {gameState.streak} days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border-color/50">
              <span className="text-text-secondary">Lessons Completed:</span>
              <span className="text-primary font-bold">📚 {gameState.completedLessons.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border-color/50">
              <span className="text-text-secondary">Quiz Puzzles Completed:</span>
              <span className="text-emerald-500 font-bold">📝 {gameState.completedQuizTopics.length}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Challenges Solved:</span>
              <span className="text-indigo-500 font-bold">💻 {gameState.completedChallengeIds.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badge collection gallery section */}
      <div>
        <h3 className="text-xl font-bold mb-6">Badges Showcase ({gameState.unlockedBadges.length} Unlocked)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {BADGES.map((badge) => {
            const isUnlocked = gameState.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`stat-card flex flex-col items-center text-center gap-2 border ${
                  isUnlocked
                    ? 'border-primary/20 bg-bg-card'
                    : 'achievement-locked border-transparent bg-bg-secondary/40'
                }`}
                title={badge.description}
              >
                <span className="text-4xl">{badge.icon}</span>
                <div>
                  <h4 className="font-extrabold text-xs text-text-primary truncate max-w-[100px]">
                    {badge.name}
                  </h4>
                  <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1 leading-normal">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
