import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { CHALLENGES } from '../data/challenges';
import PageWrapper from '../components/layout/PageWrapper';
import { FiSearch, FiCode, FiCheck, FiPlay } from 'react-icons/fi';

export default function ChallengesPage() {
  const { state: gameState } = useGame();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, unsolved, solved

  // Filtered challenges list
  const filteredChallenges = CHALLENGES.filter((ch) => {
    // 1. Search text
    const matchesSearch =
      ch.title.toLowerCase().includes(search.toLowerCase()) ||
      ch.description.toLowerCase().includes(search.toLowerCase()) ||
      ch.category.toLowerCase().includes(search.toLowerCase());

    // 2. Difficulty
    const matchesDifficulty = difficultyFilter === 'all' || ch.difficulty === difficultyFilter;

    // 3. Status
    const isCompleted = gameState.completedChallengeIds.includes(ch.id);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'solved' && isCompleted) ||
      (statusFilter === 'unsolved' && !isCompleted);

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'beginner': return 'level-beginner';
      case 'intermediate': return 'level-intermediate';
      case 'advanced': return 'level-advanced';
      case 'expert': return 'level-expert';
      default: return '';
    }
  };

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16">
      {/* Header */}
      <div className="text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-2">
            💻 Python Coding Arena
          </h2>
          <p className="text-text-secondary mt-1">
            Solve algorithms, complete functions, and test your code inside a full IDE workspace environment.
          </p>
        </div>
      </div>

      {/* Filters & Search section */}
      <div className="glass-card p-5 border-border-color shadow-sm flex flex-col md:flex-row items-center gap-4 text-left">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search challenges..."
            className="input-field pl-10"
          />
        </div>

        {/* Difficulty filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-text-muted uppercase mr-1">Difficulty:</span>
          {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase border transition-all duration-150 ${
                difficultyFilter === diff
                  ? 'bg-primary border-primary text-white font-bold'
                  : 'bg-bg-secondary border-border-color text-text-secondary hover:text-text-primary'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Status filter buttons */}
        <div className="flex flex-wrap items-center gap-2 md:ml-auto">
          <span className="text-xs font-bold text-text-muted uppercase mr-1">Status:</span>
          {['all', 'unsolved', 'solved'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase border transition-all duration-150 ${
                statusFilter === status
                  ? 'bg-emerald-500 border-emerald-500 text-white font-bold'
                  : 'bg-bg-secondary border-border-color text-text-secondary hover:text-text-primary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges list grid */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredChallenges.map((ch) => {
            const isCompleted = gameState.completedChallengeIds.includes(ch.id);
            return (
              <div
                key={ch.id}
                className={`stat-card card-hover flex flex-col justify-between gap-4 relative overflow-hidden ${
                  isCompleted ? 'border-emerald-500/20 bg-emerald-500/5' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      {ch.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`level-badge ${getDifficultyColor(ch.difficulty)}`}>
                        {ch.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                          <FiCheck size={12} /> Solved
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mt-3.5 flex items-center gap-2">
                    <FiCode className="text-primary flex-shrink-0" /> {ch.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border-color/50 pt-4 mt-2">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                    ⭐ {ch.starsReward} &bull; {ch.xpReward} XP
                  </span>

                  <Link
                    to={`/challenges/${ch.id}`}
                    className={`btn-primary py-2 px-5 text-xs rounded-xl flex items-center gap-1.5 font-bold shadow-md hover:scale-103 active:scale-95 transition-all`}
                  >
                    <FiPlay size={12} /> {isCompleted ? 'Solve Again' : 'Solve Challenge'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center glass-card p-12 border-border-color shadow-sm">
          <span className="text-4xl">🔍</span>
          <h3 className="text-xl font-extrabold mt-4">No challenges found</h3>
          <p className="text-sm text-text-muted mt-1">Try clearing your filters or changing search keywords.</p>
        </div>
      )}
    </PageWrapper>
  );
}
