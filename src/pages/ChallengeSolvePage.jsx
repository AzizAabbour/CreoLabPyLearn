import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { CHALLENGES } from '../data/challenges';
import { evaluatePythonCode } from '../utils/codeEvaluator';
import PageWrapper from '../components/layout/PageWrapper';
import Editor from '@monaco-editor/react';
import { FiArrowLeft, FiPlay, FiAward, FiHelpCircle, FiCheckCircle, FiXCircle, FiHeart, FiCode } from 'react-icons/fi';
import confetti from 'canvas-confetti';

export default function ChallengeSolvePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: gameState, dispatch, addReward } = useGame();

  const challenge = CHALLENGES.find(c => c.id === id);
  const [code, setCode] = useState('');
  const [activeHintIndex, setActiveHintIndex] = useState(-1);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (challenge) {
      setCode(challenge.starterCode);
      setActiveHintIndex(-1);
      setConsoleOutput('Console output ready.');
      setTestResults([]);
      setShowSuccessModal(false);
    }
  }, [id, challenge]);

  if (!challenge) {
    return (
      <PageWrapper className="text-center py-20">
        <h2 className="text-3xl font-extrabold">Challenge not found</h2>
        <Link to="/challenges" className="btn-primary mt-6 inline-block">
          Return to Arena
        </Link>
      </PageWrapper>
    );
  }

  const isFavorite = gameState.favoriteChallenge.includes(challenge.id);
  const isCompleted = gameState.completedChallengeIds.includes(challenge.id);

  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE_CHALLENGE', payload: challenge.id });
  };

  const handleShowHint = () => {
    if (activeHintIndex + 1 < challenge.hints.length) {
      setActiveHintIndex(prev => prev + 1);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Compiling code and executing test cases...\n');
    setTestResults([]);

    setTimeout(() => {
      const res = evaluatePythonCode(challenge.id, code);
      setIsRunning(false);

      if (res.success) {
        setTestResults(res.testResults);
        if (res.allPassed) {
          setConsoleOutput(prev => prev + `SUCCESS: All ${res.passedCount} test cases passed! 🎉\n`);
          handleSuccess();
        } else {
          setConsoleOutput(prev => prev + `FAILED: Passed ${res.passedCount}/${res.totalCount} test cases. Check details below.\n`);
        }
      } else {
        setConsoleOutput(prev => prev + `ERROR: ${res.error}\n`);
      }
    }, 800);
  };

  const handleSuccess = () => {
    if (!isCompleted) {
      addReward(challenge.starsReward, challenge.xpReward, 20); // +20 coins completed reward
      dispatch({ type: 'COMPLETE_CHALLENGE', payload: challenge.id });
      dispatch({ type: 'INCREMENT_CHALLENGES' });
    }

    // Fire confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  return (
    <PageWrapper className="flex flex-col gap-6 pb-20 relative h-[calc(100vh-6rem)] max-w-none px-2 sm:px-4">
      {/* Upper Navigation Header */}
      <div className="flex items-center justify-between bg-bg-card p-4 border border-border-color rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 text-left">
          <button
            onClick={() => navigate('/challenges')}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors font-bold"
          >
            <FiArrowLeft /> Arena
          </button>
          <span className="text-text-muted">|</span>
          <h3 className="font-extrabold text-base flex items-center gap-1.5">
            <FiCode className="text-primary" /> {challenge.title}
          </h3>
          <span className="text-xs uppercase bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
            {challenge.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-xl border transition-all duration-200 focus:outline-none ${
              isFavorite
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                : 'bg-bg-secondary border-border-color text-text-secondary hover:text-text-primary'
            }`}
            title="Favorite Challenge"
          >
            <FiHeart className={isFavorite ? 'fill-rose-500' : ''} size={16} />
          </button>
          <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
            ⭐ {challenge.starsReward} &bull; {challenge.xpReward} XP
          </span>
        </div>
      </div>

      {/* Main Workspace split panes */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 overflow-hidden">
        {/* Left Pane: Challenge instructions & hints */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Instructions card */}
          <div className="glass-card p-6 border-border-color shadow-sm flex flex-col gap-4 text-left">
            <h4 className="font-extrabold text-lg text-text-primary">Problem Description</h4>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {challenge.description}
            </div>
          </div>

          {/* Progressive Hints card */}
          <div className="glass-card p-6 border-border-color shadow-sm text-left flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-text-primary flex items-center gap-1.5">
                <FiHelpCircle className="text-accent" /> Need a Hint?
              </h4>
              {activeHintIndex + 1 < challenge.hints.length && (
                <button
                  onClick={handleShowHint}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Reveal Hint ({activeHintIndex + 1}/{challenge.hints.length})
                </button>
              )}
            </div>

            {activeHintIndex >= 0 ? (
              <div className="flex flex-col gap-2">
                {challenge.hints.slice(0, activeHintIndex + 1).map((hint, idx) => (
                  <p key={idx} className="p-3 bg-bg-secondary border border-border-color rounded-xl text-xs text-text-secondary leading-relaxed">
                    💡 <strong>Hint {idx + 1}:</strong> {hint}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-text-muted">
                Stuck on this challenge? Click reveal hint to get clues. Unlocking hints is completely free!
              </p>
            )}
          </div>

          {/* Test cases list if running */}
          {testResults.length > 0 && (
            <div className="glass-card p-6 border-border-color shadow-sm text-left flex flex-col gap-3">
              <h4 className="font-extrabold text-sm text-text-primary">Test Case Status</h4>
              <div className="flex flex-col gap-2">
                {testResults.map((tc, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                      tc.passed
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400'
                    }`}
                  >
                    <div className="flex flex-col gap-1 text-left">
                      <span>TestCase {idx + 1}: <code className="bg-bg-secondary px-1.5 py-0.5 rounded font-mono text-[10px]">{tc.input}</code></span>
                      <span className="text-text-muted font-normal">Expected: {tc.expected} | Got: {tc.actual}</span>
                    </div>
                    {tc.passed ? <FiCheckCircle size={16} /> : <FiXCircle size={16} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Editor & Output panel */}
        <div className="flex flex-col gap-4 overflow-hidden min-h-[300px]">
          {/* Monaco Editor Container */}
          <div className="flex-1 bg-[#1e1e1e] rounded-2xl border border-border-color overflow-hidden relative shadow-lg flex flex-col">
            <div className="bg-[#1e1e2e] border-b border-[#313244] px-4 py-2 flex justify-between items-center text-xs text-text-muted font-semibold font-mono">
              <span>main.py</span>
              <span className="text-primary font-bold">Python 3</span>
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language="python"
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  cursorBlinking: 'smooth',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
            </div>
          </div>

          {/* Console Output Panel */}
          <div className="h-44 bg-[#0a0d14] rounded-2xl border border-border-color shadow-lg p-4 font-mono text-left text-xs text-gray-300 flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-border-color/30 pb-2 mb-2">
              <span className="font-bold text-text-muted">Terminal Output Logs</span>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="btn-primary py-1 px-4 text-[10px] font-bold rounded-lg flex items-center gap-1.5 shadow-md"
              >
                <FiPlay size={10} /> {isRunning ? 'Running...' : 'Execute & Submit'}
              </button>
            </div>
            <pre className="flex-1 overflow-y-auto whitespace-pre-wrap select-text text-gray-400 font-mono text-left leading-relaxed">
              {consoleOutput}
            </pre>
          </div>
        </div>
      </div>

      {/* Success Completion Modal */}
      {showSuccessModal && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-55 max-w-sm w-full glass-card p-8 border-border-color shadow-2xl text-center flex flex-col gap-6 animate-[scaleIn_0.2s_ease-out]">
            <div>
              <span className="text-6xl">🎉</span>
              <h3 className="text-2xl font-black mt-4">Challenge Solved!</h3>
              <p className="text-sm text-text-muted mt-1">Excellent programming skills! You nailed it.</p>
            </div>

            <div className="bg-bg-secondary p-5 border border-border-color rounded-2xl flex flex-col gap-3 font-semibold text-sm">
              <div className="flex justify-between items-center">
                <span>Stars Gained:</span>
                <span className="text-yellow-500 font-bold">⭐ +{challenge.starsReward}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>XP Earned:</span>
                <span className="text-primary font-bold">+{challenge.xpReward} XP</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Coin Bonus:</span>
                <span className="text-emerald-500 font-bold">🪙 +20 Coins</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/challenges');
              }}
              className="btn-primary py-3 rounded-xl font-bold w-full"
            >
              Continue to Arena
            </button>
          </div>
        </>
      )}
    </PageWrapper>
  );
}
