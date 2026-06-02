import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { LEARNING_PATHS, LESSONS } from '../data/lessons';
import PageWrapper from '../components/layout/PageWrapper';
import { FiLock, FiCheck, FiPlay, FiBook, FiAward } from 'react-icons/fi';

export default function LearningPathPage() {
  const { state: gameState } = useGame();
  const [activePathId, setActivePathId] = useState('beginner');

  // Filter lessons belonging to active path, sorted by order
  const activeLessons = LESSONS.filter(l => l.pathId === activePathId).sort((a, b) => a.order - b.order);

  // Check if a path is unlocked based on level
  const isPathUnlocked = (path) => {
    return gameState.level >= path.requiredLevel;
  };

  // Get completed lessons for a path
  const getPathCompletion = (pathId) => {
    const pathLessons = LESSONS.filter(l => l.pathId === pathId);
    if (pathLessons.length === 0) return 0;
    const completed = pathLessons.filter(l => gameState.completedLessons.includes(l.id));
    return Math.round((completed.length / pathLessons.length) * 100);
  };

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16">
      {/* Page Header */}
      <div className="text-left">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          🐍 Python Learning Path
        </h2>
        <p className="text-text-secondary mt-1">
          Embark on a gamified journey from Python basic variables to expert machine learning algorithms.
        </p>
      </div>

      {/* Path Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-bg-secondary p-2 rounded-2xl border border-border-color">
        {LEARNING_PATHS.map((path) => {
          const unlocked = isPathUnlocked(path);
          const completion = getPathCompletion(path.id);
          const isActive = activePathId === path.id;

          return (
            <button
              key={path.id}
              onClick={() => unlocked && setActivePathId(path.id)}
              className={`p-4 rounded-xl flex flex-col gap-2 text-left relative overflow-hidden transition-all duration-200 border ${
                !unlocked
                  ? 'opacity-60 cursor-not-allowed border-transparent bg-transparent'
                  : isActive
                  ? 'border-primary bg-bg-card shadow-md scale-102'
                  : 'border-transparent hover:bg-bg-card/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl">{path.icon}</span>
                {!unlocked ? (
                  <span className="text-xs font-bold text-red-500 flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded-full">
                    <FiLock size={12} /> Level {path.requiredLevel}
                  </span>
                ) : (
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {completion}% Done
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-extrabold text-base">{path.name}</h4>
                <p className="text-xs text-text-muted mt-0.5 truncate">{path.description}</p>
              </div>

              {/* Progress bar inside active or completed paths */}
              {unlocked && (
                <div className="progress-bar-container h-1.5 mt-2">
                  <div
                    className="progress-bar-fill h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Vertical Interactive Roadmap Node layout */}
      <div className="glass-card p-8 border-border-color shadow-lg relative flex flex-col items-center">
        {/* Draw a connecting vertical line behind the nodes */}
        <div className="absolute top-16 bottom-16 w-1 bg-border-color left-1/2 transform -translate-x-1/2 -z-10" />

        <div className="w-full flex flex-col gap-12 max-w-xl">
          {activeLessons.map((lesson, index) => {
            const isCompleted = gameState.completedLessons.includes(lesson.id);
            // Check if user is allowed to take the lesson. A lesson is unlocked if it is the first lesson,
            // or if the previous lesson in this path is completed.
            const isFirst = index === 0;
            const prevLesson = index > 0 ? activeLessons[index - 1] : null;
            const isUnlocked = isFirst || (prevLesson && gameState.completedLessons.includes(prevLesson.id));

            return (
              <div
                key={lesson.id}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 relative w-full ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Visual Roadmap Node circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-4 shadow-lg transition-all duration-300 ${
                      !isUnlocked
                        ? 'bg-bg-secondary border-border-color text-text-muted cursor-not-allowed scale-90'
                        : isCompleted
                        ? 'bg-emerald-500 border-emerald-300 text-white hover:scale-105'
                        : 'bg-primary border-primary-dark text-white hover:scale-110 pulse-glow cursor-pointer'
                    }`}
                  >
                    {!isUnlocked ? (
                      <FiLock />
                    ) : isCompleted ? (
                      <FiCheck className="stroke-[3]" />
                    ) : (
                      <span>{lesson.icon}</span>
                    )}
                  </div>
                </div>

                {/* Node info card */}
                <div
                  className={`flex-1 glass-card p-5 border-border-color text-left w-full shadow-md transition-all duration-200 ${
                    !isUnlocked
                      ? 'opacity-50'
                      : 'hover:border-primary hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-extrabold text-lg text-text-primary flex items-center gap-2">
                        {lesson.title}
                        {isCompleted && (
                          <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold">
                            Completed
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-text-muted mt-1">
                        Topic {index + 1} &bull; {lesson.duration}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full border border-accent/20">
                      ⭐ {lesson.starsReward} &bull; {lesson.xpReward} XP
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                    {lesson.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border-color/50 pt-4">
                    <span className="text-xs text-text-muted">
                      {isCompleted
                        ? 'Re-read lesson to review'
                        : isUnlocked
                        ? 'Ready to learn!'
                        : 'Complete previous topic to unlock'}
                    </span>
                    {isUnlocked ? (
                      <Link
                        to={`/lesson/${lesson.id}`}
                        className={`btn-primary py-1.5 px-4 text-xs rounded-lg flex items-center gap-1.5 font-bold shadow-md hover:scale-103 active:scale-95 transition-all`}
                      >
                        <FiPlay size={12} /> {isCompleted ? 'Review' : 'Start'}
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="py-1.5 px-4 bg-bg-secondary border border-border-color text-text-muted text-xs rounded-lg flex items-center gap-1.5 font-bold cursor-not-allowed"
                      >
                        <FiLock size={12} /> Locked
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
