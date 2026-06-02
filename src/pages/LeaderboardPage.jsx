import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import PageWrapper from '../components/layout/PageWrapper';
import { FiTrendingUp, FiUsers, FiAward, FiStar } from 'react-icons/fi';

const MOCK_LEADERS = [
  { rank: 1, username: 'PyWizard', avatar: '🧙‍♂️', level: 42, stars: 1240, isCurrentUser: false },
  { rank: 2, username: 'CodeMaster', avatar: '🦊', level: 38, stars: 1105, isCurrentUser: false },
  { rank: 3, username: 'AlgorithmAce', avatar: '🤖', level: 35, stars: 980, isCurrentUser: false },
  { rank: 4, username: 'NumpyNinja', avatar: '🥷', level: 31, stars: 850, isCurrentUser: false },
  { rank: 5, username: 'DjangoDeveloper', avatar: '🤠', level: 28, stars: 740, isCurrentUser: false },
  { rank: 6, username: 'GuidoFan', avatar: '🦄', level: 25, stars: 620, isCurrentUser: false },
  { rank: 7, username: 'RecursionPro', avatar: '💎', level: 21, stars: 540, isCurrentUser: false },
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { state: gameState } = useGame();
  const [activeTab, setActiveTab] = useState('global'); // global, weekly, monthly

  // Inject current user into leaderboard dynamically for realism!
  const currentLeaderList = [
    ...MOCK_LEADERS,
    {
      rank: 8, // dynamically placed below
      username: user ? user.username : 'You',
      avatar: user ? user.avatar : '🐍',
      level: gameState.level,
      stars: gameState.stars,
      isCurrentUser: true
    }
  ].sort((a, b) => b.stars - a.stars); // resort based on stars

  // Re-map ranks after sorting
  const rankedLeaders = currentLeaderList.map((leader, index) => ({
    ...leader,
    rank: index + 1
  }));

  // Splitting into podium (top 3) and remaining list
  const podium = rankedLeaders.slice(0, 3);
  const remaining = rankedLeaders.slice(3);

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16">
      {/* Header */}
      <div className="text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-2">
            🏆 Global Student Leaderboard
          </h2>
          <p className="text-text-secondary mt-1">
            See how your Python skills stack up against other learners worldwide. Earn stars to climb ranks!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-bg-secondary p-1 rounded-xl border border-border-color max-w-sm">
        {['global', 'weekly', 'monthly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-semibold capitalize rounded-lg transition-all duration-200 ${
              activeTab === tab
                ? 'bg-bg-card text-primary shadow-sm font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Podium Display (Top 3) */}
      <div className="grid grid-cols-3 gap-4 items-end max-w-2xl mx-auto w-full pt-10 pb-4">
        {/* 2nd Place */}
        {podium[1] && (
          <div className="flex flex-col items-center gap-2 animate-[slideUp_0.4s_ease-out]">
            <span className="text-3xl">🥈</span>
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-300 shadow-lg flex items-center justify-center text-3xl relative">
              {podium[1].avatar}
            </div>
            <div className="text-center">
              <h4 className="font-extrabold text-xs text-text-primary truncate max-w-[80px]">
                {podium[1].username}
              </h4>
              <p className="text-[10px] text-text-muted">Lvl {podium[1].level}</p>
            </div>
            <div className="bg-slate-300/20 border border-slate-300/30 w-full rounded-t-xl h-24 flex flex-col items-center justify-center p-2">
              <span className="text-xs font-bold text-slate-500">2nd</span>
              <span className="text-[10px] text-text-secondary mt-1 flex items-center gap-0.5">
                ⭐ {podium[1].stars}
              </span>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {podium[0] && (
          <div className="flex flex-col items-center gap-2 animate-[slideUp_0.6s_ease-out]">
            <span className="text-4xl leading-none">👑</span>
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 border-4 border-yellow-400 shadow-xl flex items-center justify-center text-4xl relative scale-105">
              {podium[0].avatar}
            </div>
            <div className="text-center">
              <h4 className="font-black text-sm text-text-primary truncate max-w-[100px]">
                {podium[0].username}
              </h4>
              <p className="text-xs text-text-muted">Lvl {podium[0].level}</p>
            </div>
            <div className="bg-yellow-400/20 border border-yellow-400/30 w-full rounded-t-2xl h-32 flex flex-col items-center justify-center p-3">
              <span className="text-sm font-black text-yellow-600 dark:text-yellow-400">1st</span>
              <span className="text-xs font-bold text-text-primary mt-1 flex items-center gap-0.5">
                ⭐ {podium[0].stars}
              </span>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {podium[2] && (
          <div className="flex flex-col items-center gap-2 animate-[slideUp_0.5s_ease-out]">
            <span className="text-3xl">🥉</span>
            <div className="w-16 h-16 rounded-full bg-amber-600/10 border-4 border-amber-600/40 shadow-lg flex items-center justify-center text-3xl relative">
              {podium[2].avatar}
            </div>
            <div className="text-center">
              <h4 className="font-extrabold text-xs text-text-primary truncate max-w-[80px]">
                {podium[2].username}
              </h4>
              <p className="text-[10px] text-text-muted">Lvl {podium[2].level}</p>
            </div>
            <div className="bg-amber-600/10 border border-amber-600/20 w-full rounded-t-xl h-20 flex flex-col items-center justify-center p-2">
              <span className="text-xs font-bold text-amber-700">3rd</span>
              <span className="text-[10px] text-text-secondary mt-1 flex items-center gap-0.5">
                ⭐ {podium[2].stars}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table List */}
      <div className="glass-card border-border-color shadow-lg overflow-hidden max-w-3xl mx-auto w-full text-left">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-secondary text-xs font-bold text-text-muted uppercase border-b border-border-color">
              <tr>
                <th className="py-4 px-6 text-center w-16">Rank</th>
                <th className="py-4 px-6">Learner</th>
                <th className="py-4 px-6 text-center w-24">Level</th>
                <th className="py-4 px-6 text-right w-32">Stars</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color/50">
              {remaining.map((leader) => (
                <tr
                  key={leader.username}
                  className={`transition-colors ${
                    leader.isCurrentUser
                      ? 'bg-primary/5 hover:bg-primary/10 font-bold'
                      : 'hover:bg-bg-secondary/40'
                  }`}
                >
                  <td className="py-4 px-6 text-center text-text-secondary font-bold">
                    {leader.rank}
                  </td>
                  <td className="py-4 px-6 flex items-center gap-3">
                    <span className="text-2xl">{leader.avatar}</span>
                    <div>
                      <span className="font-semibold text-text-primary">
                        {leader.username}
                      </span>
                      {leader.isCurrentUser && (
                        <span className="ml-2 text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-text-secondary">
                    {leader.level}
                  </td>
                  <td className="py-4 px-6 text-right font-extrabold text-accent">
                    ⭐ {leader.stars}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}
