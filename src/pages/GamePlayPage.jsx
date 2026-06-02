import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import {
  SYNTAX_HUNTER_DATA,
  CODE_BUILDER_DATA,
  BUG_FIXER_DATA,
  OUTPUT_MASTER_DATA,
  SPEED_CODING_DATA,
  MEMORY_CODING_DATA,
  MAZE_PUZZLES,
  ALGO_CHALLENGE_DATA
} from '../data/gameData';
import PageWrapper from '../components/layout/PageWrapper';
import { FiArrowLeft, FiCheck, FiX, FiAward, FiClock, FiPlay, FiInfo, FiChevronRight } from 'react-icons/fi';
import confetti from 'canvas-confetti';

export default function GamePlayPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { state: gameState, dispatch, addReward } = useGame();

  // Common game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Sub-game specific states
  const [activeSelectedLine, setActiveSelectedLine] = useState(null); // Syntax Hunter
  const [builderBlocks, setBuilderBlocks] = useState([]); // Code Builder
  const [bugInputCode, setBugInputCode] = useState(''); // Bug Fixer
  const [selectedOutputOpt, setSelectedOutputOpt] = useState(''); // Output Master
  const [speedTimer, setSpeedTimer] = useState(10); // Speed Coding
  const [memoryStage, setMemoryStage] = useState('memorize'); // memorize, type
  const [memoryInput, setMemoryInput] = useState(''); // Memory Coding
  const [mazeNode, setMazeNode] = useState('start'); // Python Maze
  const [mazeInput, setMazeInput] = useState(''); // Python Maze
  const [algoSelectedOpt, setAlgoSelectedOpt] = useState(''); // Algo Challenge

  // Timer Ref for Speed Coding
  const speedIntervalRef = useState(null);

  // Initialize and Reset Game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLevelIndex(0);
    setGameFinished(false);
    resetLevelState(0);
  };

  const resetLevelState = (idx) => {
    setActiveSelectedLine(null);
    setSelectedOutputOpt('');
    setBugInputCode('');
    setMemoryInput('');
    setMazeInput('');
    setAlgoSelectedOpt('');

    if (gameId === 'code-builder') {
      const data = CODE_BUILDER_DATA[idx];
      if (data) {
        setBuilderBlocks([...data.blocks].sort(() => Math.random() - 0.5));
      }
    }
    if (gameId === 'bug-fixer') {
      const data = BUG_FIXER_DATA[idx];
      if (data) {
        setBugInputCode(data.brokenCode);
      }
    }
    if (gameId === 'speed-coding') {
      setSpeedTimer(10);
    }
    if (gameId === 'memory-coding') {
      setMemoryStage('memorize');
    }
    if (gameId === 'python-maze') {
      setMazeNode('start');
    }
  };

  // Timer for Speed Coding
  useEffect(() => {
    let timer;
    if (gameId === 'speed-coding' && isPlaying && !gameFinished) {
      timer = setInterval(() => {
        setSpeedTimer(prev => {
          if (prev <= 1) {
            handleSpeedTimeout();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameId, isPlaying, levelIndex, gameFinished]);

  const handleSpeedTimeout = () => {
    // Timeout marks question as wrong, move to next
    nextLevel(false);
  };

  // Memory Coding stage transition
  useEffect(() => {
    let timer;
    if (gameId === 'memory-coding' && isPlaying && memoryStage === 'memorize' && !gameFinished) {
      timer = setTimeout(() => {
        setMemoryStage('type');
      }, 8000); // 8 seconds to memorize
    }
    return () => clearTimeout(timer);
  }, [gameId, isPlaying, levelIndex, memoryStage, gameFinished]);

  // Finish Game
  const finishGame = (finalScore) => {
    setGameFinished(true);
    // Save high score
    dispatch({ type: 'SET_GAME_HIGH_SCORE', payload: { gameId, score: finalScore } });
    dispatch({ type: 'INCREMENT_GAMES' });

    // Calculate stars and XP
    let starsGained = 0;
    let xpGained = 0;

    if (finalScore >= 3) {
      starsGained = 5;
      xpGained = 40;
    } else if (finalScore >= 1) {
      starsGained = 3;
      xpGained = 20;
    } else {
      xpGained = 5;
    }

    addReward(starsGained, xpGained, 10); // +10 coins completed reward

    // Confetti
    if (finalScore >= 2) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const nextLevel = (success) => {
    let newScore = score;
    if (success) {
      newScore += 1;
      setScore(newScore);
    }

    const nextIdx = levelIndex + 1;
    const maxIdx = getMaxLevels();

    if (nextIdx < maxIdx) {
      setLevelIndex(nextIdx);
      resetLevelState(nextIdx);
    } else {
      finishGame(newScore);
    }
  };

  const getMaxLevels = () => {
    switch (gameId) {
      case 'syntax-hunter': return SYNTAX_HUNTER_DATA.length;
      case 'code-builder': return CODE_BUILDER_DATA.length;
      case 'bug-fixer': return BUG_FIXER_DATA.length;
      case 'output-master': return OUTPUT_MASTER_DATA.length;
      case 'speed-coding': return SPEED_CODING_DATA.length;
      case 'memory-coding': return MEMORY_CODING_DATA.length;
      case 'python-maze': return 1; // maze has internal rooms
      case 'algo-challenge': return ALGO_CHALLENGE_DATA.length;
      default: return 1;
    }
  };

  // Game Logic Verifications
  const handleSyntaxHunterClick = (lineIdx) => {
    if (activeSelectedLine !== null) return;
    setActiveSelectedLine(lineIdx);
    const correct = lineIdx === SYNTAX_HUNTER_DATA[levelIndex].errorLine;
    setTimeout(() => {
      nextLevel(correct);
    }, 1500);
  };

  const handleCodeBuilderMove = (from, to) => {
    const updated = [...builderBlocks];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setBuilderBlocks(updated);
  };

  const checkCodeBuilder = () => {
    const data = CODE_BUILDER_DATA[levelIndex];
    const correct = JSON.stringify(builderBlocks) === JSON.stringify(data.blocks);
    nextLevel(correct);
  };

  const checkBugFixer = () => {
    const data = BUG_FIXER_DATA[levelIndex];
    // Remove whitespace/newlines and compare
    const clean = (str) => str.replace(/\s+/g, '');
    const correct = clean(bugInputCode) === clean(data.fixedCode);
    nextLevel(correct);
  };

  const checkOutputMaster = (opt) => {
    setSelectedOutputOpt(opt);
    const correct = opt === OUTPUT_MASTER_DATA[levelIndex].answer;
    setTimeout(() => {
      nextLevel(correct);
    }, 1500);
  };

  const checkSpeedCoding = (opt) => {
    const correct = opt === SPEED_CODING_DATA[levelIndex].answer;
    nextLevel(correct);
  };

  const checkMemoryCoding = () => {
    const data = MEMORY_CODING_DATA[levelIndex];
    const clean = (str) => str.replace(/\s+/g, '').toLowerCase();
    const correct = clean(memoryInput) === clean(data.code);
    nextLevel(correct);
  };

  const checkMazePuzzle = () => {
    const node = MAZE_PUZZLES[mazeNode];
    if (!node) return;
    const correct = mazeInput.trim().toLowerCase() === node.answer.toLowerCase();
    if (correct) {
      if (node.next === 'exit') {
        finishGame(3); // Escaped!
      } else {
        setMazeNode(node.next);
        setMazeInput('');
      }
    } else {
      // incorrect maze answer ends path
      finishGame(score);
    }
  };

  const checkAlgoChallenge = (opt) => {
    setAlgoSelectedOpt(opt);
    const correct = opt === ALGO_CHALLENGE_DATA[levelIndex].answer;
    setTimeout(() => {
      nextLevel(correct);
    }, 1500);
  };

  // Render individual subgame panels
  const renderGameUI = () => {
    switch (gameId) {
      case 'syntax-hunter': {
        const data = SYNTAX_HUNTER_DATA[levelIndex];
        if (!data) return null;
        return (
          <div className="flex flex-col gap-6 text-left">
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
              <p className="text-sm font-bold text-primary flex items-center gap-1.5">
                <FiInfo /> How to Play:
              </p>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Analyze the code below. One line contains a syntax error (e.g. missing colon, bad indentation). Click on that line to submit!
              </p>
            </div>

            <div className="flex flex-col border border-border-color rounded-2xl overflow-hidden shadow-inner">
              {data.code.split('\n').map((line, idx) => {
                const isSelected = activeSelectedLine === idx;
                const isCorrect = idx === data.errorLine;
                
                let lineStyle = 'hover:bg-bg-secondary text-text-primary';
                if (activeSelectedLine !== null) {
                  if (isCorrect) lineStyle = 'bg-green-500/10 border-l-4 border-green-500 text-green-600 dark:text-green-400 font-semibold';
                  else if (isSelected) lineStyle = 'bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400';
                  else lineStyle = 'opacity-50';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSyntaxHunterClick(idx)}
                    disabled={activeSelectedLine !== null}
                    className={`py-3 px-6 text-left font-mono text-xs border-b border-border-color/30 flex justify-between items-center transition-all ${lineStyle}`}
                  >
                    <span>{idx + 1}. &nbsp; {line}</span>
                    {activeSelectedLine !== null && isCorrect && <span className="text-green-500 font-bold">Error is here ✓</span>}
                  </button>
                );
              })}
            </div>

            {activeSelectedLine !== null && (
              <div className="p-4 bg-bg-secondary rounded-xl border border-border-color leading-relaxed text-xs">
                <p className="font-bold text-text-primary">Bug Explanation:</p>
                <p className="text-text-secondary mt-1">{data.explanation}</p>
              </div>
            )}
          </div>
        );
      }

      case 'code-builder': {
        const data = CODE_BUILDER_DATA[levelIndex];
        if (!data) return null;
        return (
          <div className="flex flex-col gap-6 text-left">
            <div>
              <h4 className="font-extrabold text-lg text-text-primary">{data.title}</h4>
              <p className="text-xs text-text-muted mt-1">{data.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              {builderBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-bg-secondary border border-border-color rounded-xl font-mono text-xs flex justify-between items-center shadow-sm"
                >
                  <span>{block}</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleCodeBuilderMove(idx, Math.max(0, idx - 1))}
                      className="p-1 hover:bg-bg-card rounded text-text-secondary border border-border-color"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleCodeBuilderMove(idx, Math.min(builderBlocks.length - 1, idx + 1))}
                      className="p-1 hover:bg-bg-card rounded text-text-secondary border border-border-color"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={checkCodeBuilder}
              className="btn-primary py-3 rounded-xl font-bold shadow-md w-full"
            >
              Verify Code Sequence
            </button>
          </div>
        );
      }

      case 'bug-fixer': {
        const data = BUG_FIXER_DATA[levelIndex];
        if (!data) return null;
        return (
          <div className="flex flex-col gap-6 text-left">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl leading-relaxed text-xs text-text-secondary">
              <strong>Task:</strong> {data.description}
            </div>

            <textarea
              value={bugInputCode}
              onChange={(e) => setBugInputCode(e.target.value)}
              className="code-block w-full h-44 font-mono text-xs leading-relaxed p-4 outline-none border border-border-color rounded-xl"
              spellCheck={false}
            />

            <div className="flex gap-4">
              <button
                onClick={() => resetLevelState(levelIndex)}
                className="btn-secondary py-2.5 px-6 rounded-xl text-xs font-bold"
              >
                Reset Snippet
              </button>
              <button
                onClick={checkBugFixer}
                className="btn-primary py-2.5 px-6 rounded-xl text-xs font-bold flex-1"
              >
                Test Code
              </button>
            </div>

            <div className="p-4 bg-bg-secondary rounded-xl border border-border-color text-xs flex flex-col gap-2">
              <p className="font-bold text-text-primary">💡 Hint:</p>
              <p className="text-text-secondary leading-relaxed">{data.hints[0]}</p>
            </div>
          </div>
        );
      }

      case 'output-master': {
        const data = OUTPUT_MASTER_DATA[levelIndex];
        if (!data) return null;
        return (
          <div className="flex flex-col gap-6 text-left">
            <pre className="code-block p-4 font-mono text-xs rounded-xl shadow-inner border border-border-color/20 text-left overflow-x-auto leading-relaxed">
              <code>{data.code}</code>
            </pre>

            <div className="grid grid-cols-1 gap-3">
              {data.options.map((opt, idx) => {
                const isSelected = selectedOutputOpt === opt;
                const isCorrect = opt === data.answer;

                let cardStyle = 'border-border-color hover:border-primary hover:bg-bg-secondary';
                if (isSelected) cardStyle = 'answer-selected border-primary';
                if (selectedOutputOpt !== '') {
                  if (isCorrect) cardStyle = 'answer-correct text-green-600 dark:text-green-400 font-bold';
                  else if (isSelected) cardStyle = 'answer-wrong text-red-600 dark:text-red-400';
                  else cardStyle = 'opacity-50 border-border-color';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => checkOutputMaster(opt)}
                    disabled={selectedOutputOpt !== ''}
                    className={`p-4 border-2 rounded-xl text-left font-medium text-xs transition-all duration-150 flex justify-between items-center ${cardStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOutputOpt !== '' && isCorrect && <span className="text-green-500 font-black">✓ Correct</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      case 'speed-coding': {
        const data = SPEED_CODING_DATA[levelIndex];
        if (!data) return null;
        return (
          <div className="flex flex-col gap-6 text-left">
            {/* Speed Timer */}
            <div className="flex justify-between items-center bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-xs font-bold">
              <span className="flex items-center gap-1.5"><FiClock className="animate-spin" /> Countdown:</span>
              <span>{speedTimer}s</span>
            </div>

            <h4 className="font-extrabold text-base leading-relaxed text-text-primary">
              {data.prompt}
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {data.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => checkSpeedCoding(opt)}
                  className="p-4 border-2 border-border-color hover:border-primary hover:bg-bg-secondary rounded-xl text-left font-medium text-xs transition-all duration-150"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      }

      case 'memory-coding': {
        const data = MEMORY_CODING_DATA[levelIndex];
        if (!data) return null;

        if (memoryStage === 'memorize') {
          return (
            <div className="flex flex-col gap-6 text-left">
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl leading-relaxed text-xs text-text-secondary flex justify-between items-center">
                <span>🧠 Memorize this snippet! You have 8 seconds.</span>
                <span className="font-bold text-primary">Ready...</span>
              </div>
              <pre className="code-block p-4 font-mono text-sm rounded-xl shadow-inner border border-border-color/20 text-left overflow-x-auto leading-relaxed animate-pulse">
                <code>{data.code}</code>
              </pre>
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-6 text-left">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl leading-relaxed text-xs text-amber-600">
              ✍️ Type the code exactly from memory! (ignore leading/trailing whitespaces)
            </div>

            <textarea
              value={memoryInput}
              onChange={(e) => setMemoryInput(e.target.value)}
              placeholder="Type snippet here..."
              className="code-block w-full h-40 font-mono text-xs leading-relaxed p-4 outline-none border border-border-color rounded-xl"
              spellCheck={false}
            />

            <button
              onClick={checkMemoryCoding}
              className="btn-primary py-3 rounded-xl font-bold shadow-md w-full"
            >
              Submit Output
            </button>
          </div>
        );
      }

      case 'python-maze': {
        const node = MAZE_PUZZLES[mazeNode];
        if (!node) return null;

        return (
          <div className="flex flex-col gap-6 text-left">
            <div className="bg-bg-secondary p-5 border border-border-color rounded-2xl flex flex-col gap-3">
              <span className="text-4xl text-center">🌀</span>
              <p className="text-sm text-text-secondary leading-relaxed text-center">
                {node.text}
              </p>
            </div>

            {node.answer && (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={mazeInput}
                  onChange={(e) => setMazeInput(e.target.value)}
                  placeholder="Answer string..."
                  className="input-field font-mono text-center text-sm"
                />
                <button
                  onClick={checkMazePuzzle}
                  className="btn-primary py-3 rounded-xl font-bold w-full"
                >
                  Submit Gate Key
                </button>
                <p className="text-[10px] text-text-muted mt-1 leading-relaxed text-center">
                  💡 Hint: {node.hint}
                </p>
              </div>
            )}

            {!node.answer && (
              <Link to="/games" className="btn-primary py-3 rounded-xl font-bold w-full text-center">
                Escape Complete! Return to Arcade
              </Link>
            )}
          </div>
        );
      }

      case 'algo-challenge': {
        const data = ALGO_CHALLENGE_DATA[levelIndex];
        if (!data) return null;
        return (
          <div className="flex flex-col gap-6 text-left">
            <div className="bg-bg-secondary p-5 border border-border-color rounded-2xl">
              <h4 className="font-extrabold text-sm text-text-primary uppercase tracking-wider mb-2">
                {data.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {data.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {data.options.map((opt, idx) => {
                const isSelected = algoSelectedOpt === opt;
                const isCorrect = opt === data.answer;

                let cardStyle = 'border-border-color hover:border-primary hover:bg-bg-secondary';
                if (isSelected) cardStyle = 'answer-selected border-primary';
                if (algoSelectedOpt !== '') {
                  if (isCorrect) cardStyle = 'answer-correct text-green-600 dark:text-green-400 font-bold';
                  else if (isSelected) cardStyle = 'answer-wrong text-red-600 dark:text-red-400';
                  else cardStyle = 'opacity-50 border-border-color';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => checkAlgoChallenge(opt)}
                    disabled={algoSelectedOpt !== ''}
                    className={`p-4 border-2 rounded-xl text-left font-medium text-xs transition-all duration-150 flex justify-between items-center ${cardStyle}`}
                  >
                    <span>{opt}</span>
                    {algoSelectedOpt !== '' && isCorrect && <span className="text-green-500 font-bold">✓ Correct</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <PageWrapper className="flex flex-col gap-6 pb-16 max-w-2xl mx-auto w-full">
      {/* Header Panel */}
      <div className="flex justify-between items-center bg-bg-card p-4 border border-border-color rounded-2xl shadow-sm">
        <button
          onClick={() => navigate('/games')}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors font-bold text-left"
        >
          <FiArrowLeft /> Arcade
        </button>
        <h3 className="font-extrabold text-base capitalize">
          {gameId ? gameId.replace('-', ' ') : 'Gameplay'}
        </h3>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold border border-primary/20">
          🎮
        </div>
      </div>

      {/* Main Playing Sandbox Container */}
      {!isPlaying && !gameFinished && (
        <div className="glass-card p-8 border-border-color shadow-2xl text-center flex flex-col gap-6">
          <span className="text-6xl animate-pulse">🕹️</span>
          <div>
            <h3 className="text-2xl font-black capitalize">Ready to play {gameId?.replace('-', ' ')}?</h3>
            <p className="text-sm text-text-muted mt-2">
              Solve interactive coding puzzles and increase your high score.
            </p>
          </div>
          <button
            onClick={startGame}
            className="btn-primary py-3 rounded-xl font-bold shadow-lg"
          >
            Start Match
          </button>
        </div>
      )}

      {isPlaying && !gameFinished && (
        <div className="glass-card p-6 sm:p-8 border-border-color shadow-xl flex flex-col gap-6">
          {/* Level indicators */}
          <div className="flex justify-between items-center border-b border-border-color/50 pb-4">
            <span className="text-xs font-bold text-text-muted">
              Puzzles solved: {levelIndex} / {getMaxLevels()}
            </span>
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              🏆 Score: {score}
            </span>
          </div>

          {/* Render individual subgame module */}
          {renderGameUI()}
        </div>
      )}

      {/* Finished Game summary screen */}
      {gameFinished && (
        <div className="glass-card p-8 border-border-color shadow-2xl text-center flex flex-col gap-6 animate-[scaleIn_0.2s_ease-out]">
          <div>
            <span className="text-6xl">🏆</span>
            <h3 className="text-2xl font-black mt-4">Match Completed!</h3>
            <p className="text-sm text-text-muted mt-1 capitalize">
              Your final score in {gameId?.replace('-', ' ')}
            </p>
          </div>

          <div className="bg-bg-secondary p-5 border border-border-color rounded-2xl flex flex-col gap-3 font-semibold text-sm">
            <div className="flex justify-between items-center">
              <span>Final Match Score:</span>
              <span className="text-primary font-bold text-base">{score} points</span>
            </div>
            <div className="border-b border-border-color/50 my-1" />
            <div className="flex justify-between items-center text-text-primary text-xs">
              <span>Star Bonus:</span>
              <span className="text-yellow-500 font-bold">⭐ +{score >= 3 ? 5 : score >= 1 ? 3 : 0}</span>
            </div>
            <div className="flex justify-between items-center text-text-primary text-xs">
              <span>XP Bonus:</span>
              <span className="text-primary font-bold">+{score >= 3 ? 40 : score >= 1 ? 20 : 5} XP</span>
            </div>
            <div className="flex justify-between items-center text-text-primary text-xs">
              <span>Coin Reward:</span>
              <span className="text-emerald-500 font-bold">🪙 +10 Coins</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="btn-secondary py-3 px-6 text-sm rounded-xl flex-1 flex items-center justify-center gap-1.5"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/games')}
              className="btn-primary py-3 px-6 text-sm rounded-xl flex-1 flex items-center justify-center gap-1.5"
            >
              Arcade Hall
            </button>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
