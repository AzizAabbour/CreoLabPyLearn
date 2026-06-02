import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import PageWrapper from '../components/layout/PageWrapper';
import { FiPlay, FiStar, FiAward } from 'react-icons/fi';

const GAMES_LIST = [
  {
    id: 'syntax-hunter',
    title: 'Syntax Hunter',
    description: 'Find syntax errors in Python snippets. Tap lines of code to highlight the bug.',
    difficulty: 'beginner',
    icon: '🎯',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'code-builder',
    title: 'Code Builder',
    description: 'Drag and drop shuffled code blocks into the correct logical sequence.',
    difficulty: 'beginner',
    icon: '🧩',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'bug-fixer',
    title: 'Bug Fixer',
    description: 'Read the task description and repair broken code snippets to solve the bug.',
    difficulty: 'intermediate',
    icon: '🐛',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'output-master',
    title: 'Output Master',
    description: 'Read Python code snippets and predict the exact printed console output.',
    difficulty: 'intermediate',
    icon: '🖥️',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'speed-coding',
    title: 'Speed Coding',
    description: 'Race against the clock to answer quick MCQs before the timer runs out!',
    difficulty: 'intermediate',
    icon: '⚡',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'memory-coding',
    title: 'Memory Coding',
    description: 'Memorize a short Python snippet, then reproduce it character-for-character from memory.',
    difficulty: 'advanced',
    icon: '🧠',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'python-maze',
    title: 'Python Maze',
    description: 'Navigate a grid-based puzzle room by answering coding queries at each node.',
    difficulty: 'advanced',
    icon: '🌀',
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'algo-challenge',
    title: 'Algo Challenge',
    description: 'Step-by-step logic puzzles focusing on sorting algorithms and stack/queue structures.',
    difficulty: 'expert',
    icon: '🛡️',
    color: 'from-rose-500 to-red-600'
  }
];

export default function GamesPage() {
  const { state: gameState } = useGame();

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
      <div className="text-left">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          🎮 CreoLab Coding Arcade
        </h2>
        <p className="text-text-secondary mt-1">
          Play mini-games to sharpen your Python skills. Earn high scores, coins, and stars for top performance.
        </p>
      </div>

      {/* Games Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES_LIST.map((game) => {
          const highScore = gameState.gameHighScores[game.id] || 0;
          return (
            <div
              key={game.id}
              className="stat-card card-hover flex flex-col justify-between gap-6 text-left relative overflow-hidden group"
            >
              {/* Card visual header */}
              <div className="flex gap-4 items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md bg-gradient-to-br ${game.color} text-white`}>
                  {game.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className={`level-badge ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                    {highScore > 0 && (
                      <span className="text-[10px] font-bold text-accent flex items-center gap-0.5 bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                        🏆 Best: {highScore}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mt-2 text-text-primary group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {game.description}
              </p>

              <div className="flex items-center justify-between border-t border-border-color/50 pt-4 mt-2">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <FiStar className="text-yellow-500" /> Max +5 Stars per session
                </span>

                <Link
                  to={`/games/${game.id}`}
                  className="btn-primary py-2 px-5 text-xs rounded-xl flex items-center gap-1.5 font-bold shadow-md hover:scale-103 active:scale-95 transition-all"
                >
                  <FiPlay size={12} /> Play Game
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
