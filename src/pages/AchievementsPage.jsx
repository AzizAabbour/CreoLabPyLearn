import { useGame } from '../contexts/GameContext';
import { ACHIEVEMENTS } from '../data/achievements';
import PageWrapper from '../components/layout/PageWrapper';
import { FiAward, FiCheck, FiLock } from 'react-icons/fi';

export default function AchievementsPage() {
  const { state: gameState } = useGame();

  // Helper function to calculate current progress values for each achievement condition
  const getAchievementProgress = (id) => {
    switch (id) {
      // Quizzes
      case 'ach-quiz-1': return { current: gameState.totalQuizzes, target: 1 };
      case 'ach-quiz-10': return { current: gameState.totalQuizzes, target: 10 };
      case 'ach-quiz-25': return { current: gameState.totalQuizzes, target: 25 };
      case 'ach-quiz-50': return { current: gameState.totalQuizzes, target: 50 };
      // Stars
      case 'ach-stars-25': return { current: gameState.stars, target: 25 };
      case 'ach-stars-100': return { current: gameState.stars, target: 100 };
      case 'ach-stars-500': return { current: gameState.stars, target: 500 };
      case 'ach-stars-1000': return { current: gameState.stars, target: 1000 };
      // Challenges
      case 'ach-challenge-1': return { current: gameState.totalChallenges, target: 1 };
      case 'ach-challenge-10': return { current: gameState.totalChallenges, target: 10 };
      case 'ach-challenge-25': return { current: gameState.totalChallenges, target: 25 };
      case 'ach-challenge-50': return { current: gameState.totalChallenges, target: 50 };
      // Streak
      case 'ach-streak-3': return { current: gameState.streak, target: 3 };
      case 'ach-streak-7': return { current: gameState.streak, target: 7 };
      case 'ach-streak-30': return { current: gameState.streak, target: 30 };
      // Level
      case 'ach-level-5': return { current: gameState.level, target: 5 };
      case 'ach-level-10': return { current: gameState.level, target: 10 };
      case 'ach-level-25': return { current: gameState.level, target: 25 };
      case 'ach-level-50': return { current: gameState.level, target: 50 };
      // Default
      default: return { current: 0, target: 1 };
    }
  };

  const unlockedCount = gameState.unlockedAchievements.length;

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-2">
            🏆 Accomplishments & Milestones
          </h2>
          <p className="text-text-secondary mt-1">
            Complete milestone objectives to claim additional XP rewards and level up your coder rank.
          </p>
        </div>

        <div className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-sm font-bold rounded-xl">
          Completed {unlockedCount} / {ACHIEVEMENTS.length}
        </div>
      </div>

      {/* Achievement list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = gameState.unlockedAchievements.includes(ach.id);
          const progress = getAchievementProgress(ach.id);
          const percent = Math.min((progress.current / progress.target) * 100, 100);

          return (
            <div
              key={ach.id}
              className={`glass-card p-6 border flex gap-4 items-start relative overflow-hidden transition-all duration-200 ${
                isUnlocked
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-border-color bg-bg-card'
              }`}
            >
              {/* Icon / Status */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md border ${
                  isUnlocked
                    ? 'bg-emerald-500 border-emerald-400 text-white'
                    : 'bg-bg-secondary border-border-color text-text-muted'
                }`}
              >
                {isUnlocked ? <span>{ach.icon}</span> : <FiLock size={18} />}
              </div>

              {/* Info details */}
              <div className="flex-1 flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="font-extrabold text-base text-text-primary">
                    {ach.name}
                  </h4>
                  <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                    +{ach.xpReward} XP
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {ach.description}
                </p>

                {/* Progress bar and numeric tracking */}
                <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-text-muted">
                  <div className="flex-1 progress-bar-container h-2">
                    <div
                      className={`progress-bar-fill h-full ${
                        isUnlocked
                          ? 'bg-emerald-500'
                          : 'bg-primary'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-10 text-right">
                    {progress.current}/{progress.target}
                  </span>
                </div>

                {isUnlocked && (
                  <div className="absolute right-3 bottom-3 text-emerald-500 flex items-center gap-0.5 text-[10px] font-bold">
                    <FiCheck /> Unlocked
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
