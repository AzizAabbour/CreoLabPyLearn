import { useState, useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { QUIZZES } from '../data/quizzes';
import { LESSONS } from '../data/lessons';
import { calculateQuizScore } from '../utils/scoring';
import PageWrapper from '../components/layout/PageWrapper';
import { FiClock, FiCheck, FiX, FiInfo, FiArrowRight, FiRotateCcw, FiList } from 'react-icons/fi';
import confetti from 'canvas-confetti';

const TIMER_LIMIT = 30; // 30 seconds per question

export default function QuizPage() {
  const { state: gameState, dispatch, addReward } = useGame();
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Quiz session state
  const [sessionActive, setSessionActive] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [fillAnswer, setFillAnswer] = useState('');
  const [dragBlocks, setDragBlocks] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Array of { questionId, isCorrect, isPartial }
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(TIMER_LIMIT);
  const timerRef = useRef(null);

  // Result state
  const [showResults, setShowResults] = useState(false);
  const [sessionSummary, setSessionSummary] = useState(null);

  // Filter lessons that have quizzes available
  const topicsWithQuizzes = Object.keys(QUIZZES).map(key => {
    const lesson = LESSONS.find(l => l.id === key);
    return {
      id: key,
      title: lesson ? lesson.title : key.charAt(0).toUpperCase() + key.slice(1),
      pathId: lesson ? lesson.pathId : 'other',
      questionsCount: QUIZZES[key].length
    };
  });

  const startQuiz = (topicId) => {
    const quizQuestions = QUIZZES[topicId];
    if (!quizQuestions || quizQuestions.length === 0) return;
    
    // Shuffle or copy questions
    setQuestions([...quizQuestions]);
    setSelectedTopic(topicId);
    setSessionActive(true);
    setCurrentIndex(0);
    setIsAnswered(false);
    setUserAnswers([]);
    setShowResults(false);
    resetQuestionState(quizQuestions[0]);
  };

  const resetQuestionState = (question) => {
    setSelectedOption('');
    setFillAnswer('');
    setIsAnswered(false);
    setTimeLeft(TIMER_LIMIT);

    if (question.type === 'dragdrop') {
      // Shuffled copy of blocks
      const shuffled = [...question.blocks].sort(() => Math.random() - 0.5);
      setDragBlocks(shuffled);
    }
  };

  // Timer Effect
  useEffect(() => {
    if (sessionActive && !isAnswered && !showResults) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionActive, currentIndex, isAnswered, showResults]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    const q = questions[currentIndex];
    setUserAnswers(prev => [...prev, { questionId: q.id, isCorrect: false, isPartial: false }]);
    dispatch({ type: 'ADD_WRONG' });
  };

  const handleDragBlockMove = (fromIndex, toIndex) => {
    const updated = [...dragBlocks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setDragBlocks(updated);
  };

  const checkAnswer = () => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const q = questions[currentIndex];
    let isCorrect = false;
    let isPartial = false;

    if (q.type === 'mcq' || q.type === 'tf' || q.type === 'completion' || q.type === 'error' || q.type === 'output') {
      isCorrect = selectedOption === q.answer;
    } else if (q.type === 'fill') {
      isCorrect = fillAnswer.trim().toLowerCase() === q.answer.toLowerCase();
    } else if (q.type === 'dragdrop') {
      // check ordering
      isCorrect = JSON.stringify(dragBlocks) === JSON.stringify(q.blocks);
    }

    // Record answer
    setUserAnswers(prev => [...prev, { questionId: q.id, isCorrect, isPartial }]);

    if (isCorrect) {
      dispatch({ type: 'ADD_CORRECT' });
    } else {
      dispatch({ type: 'ADD_WRONG' });
    }

    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      resetQuestionState(questions[nextIdx]);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setSessionActive(false);
    // calculate score using scoring helper
    const summary = calculateQuizScore(userAnswers, false);
    setSessionSummary(summary);
    setShowResults(true);

    // Dispatch stats
    dispatch({ type: 'INCREMENT_QUIZZES' });
    dispatch({ type: 'COMPLETE_QUIZ_TOPIC', payload: selectedTopic });
    if (summary.isPerfect) {
      dispatch({ type: 'ADD_PERFECT_QUIZ' });
    }

    // add reward
    addReward(summary.stars, summary.xp, 15); // +15 coins completed bonus

    // confetti celebration
    if (summary.percentage >= 60) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Render question card UI based on type
  const renderQuestionUI = () => {
    const q = questions[currentIndex];
    if (!q) return null;

    return (
      <div className="flex flex-col gap-5 text-left w-full">
        {/* Code snippet display if available */}
        {q.code && (
          <pre className="code-block p-4 font-mono text-xs rounded-xl shadow-inner border border-border-color/20 text-left overflow-x-auto leading-relaxed">
            <code>{q.code}</code>
          </pre>
        )}

        {/* Options */}
        {(q.type === 'mcq' || q.type === 'tf' || q.type === 'completion' || q.type === 'error' || q.type === 'output') && (
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrectAnswer = opt === q.answer;
              
              let cardStyle = 'border-border-color hover:border-primary hover:bg-bg-secondary';
              if (isSelected) cardStyle = 'answer-selected border-primary';
              if (isAnswered) {
                if (isCorrectAnswer) cardStyle = 'answer-correct text-green-600 dark:text-green-400 font-bold';
                else if (isSelected) cardStyle = 'answer-wrong text-red-600 dark:text-red-400';
                else cardStyle = 'opacity-50 border-border-color';
              }

              return (
                <button
                  key={idx}
                  onClick={() => !isAnswered && setSelectedOption(opt)}
                  disabled={isAnswered}
                  className={`p-4 border-2 rounded-xl text-left font-medium text-sm transition-all duration-150 flex items-center justify-between ${cardStyle} ${
                    !isAnswered && 'cursor-pointer'
                  }`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrectAnswer && <FiCheck className="text-green-500 font-black" />}
                  {isAnswered && isSelected && !isCorrectAnswer && <FiX className="text-red-500 font-black" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Fill in the blank input */}
        {q.type === 'fill' && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => !isAnswered && setFillAnswer(e.target.value)}
              disabled={isAnswered}
              placeholder="Type your answer here..."
              className={`input-field font-mono text-center text-lg ${
                isAnswered
                  ? fillAnswer.trim().toLowerCase() === q.answer.toLowerCase()
                    ? 'answer-correct'
                    : 'answer-wrong'
                  : ''
              }`}
            />
            {isAnswered && (
              <p className="text-xs text-text-muted mt-1 text-center">
                Correct answer: <span className="font-bold text-emerald-500">{q.answer}</span>
              </p>
            )}
          </div>
        )}

        {/* Drag and Drop ordering */}
        {q.type === 'dragdrop' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-text-muted">Reorder blocks into correct execution sequence (top to bottom):</p>
            <div className="flex flex-col gap-2">
              {dragBlocks.map((block, idx) => (
                <div
                  key={idx}
                  className={`p-3 bg-bg-secondary border border-border-color rounded-xl font-mono text-xs flex justify-between items-center transition-all ${
                    isAnswered ? 'opacity-80' : ''
                  }`}
                >
                  <span>{block}</span>
                  {!isAnswered && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleDragBlockMove(idx, Math.max(0, idx - 1))}
                        className="p-1 hover:bg-bg-card rounded text-text-secondary"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleDragBlockMove(idx, Math.min(dragBlocks.length - 1, idx + 1))}
                        className="p-1 hover:bg-bg-card rounded text-text-secondary"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isAnswered && (
              <div className="text-xs p-3 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="font-bold text-primary mb-1">Correct Code Layout:</p>
                <pre className="font-mono text-text-secondary">{q.blocks.join('\n')}</pre>
              </div>
            )}
          </div>
        )}

        {/* Explanation Alert when answered */}
        {isAnswered && (
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex gap-3 text-left">
            <FiInfo className="text-primary flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-bold text-text-primary">Explanation</p>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16">
      {/* Quiz Selector screen */}
      {!sessionActive && !showResults && (
        <>
          <div className="text-left">
            <h2 className="text-3xl font-extrabold flex items-center gap-2">
              📝 Interactive Python Quizzes
            </h2>
            <p className="text-text-secondary mt-1">
              Select a lesson topic below to test your knowledge. Earn stars and coins for correct answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicsWithQuizzes.map((topic) => {
              const isCompleted = gameState.completedQuizTopics.includes(topic.id);
              return (
                <div key={topic.id} className="stat-card flex flex-col justify-between gap-4 text-left">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                        {topic.pathId}
                      </span>
                      {isCompleted && (
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          Completed ✓
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mt-2.5">{topic.title}</h3>
                    <p className="text-xs text-text-muted mt-1">
                      Contains {topic.questionsCount} question puzzles
                    </p>
                  </div>

                  <button
                    onClick={() => startQuiz(topic.id)}
                    className="btn-primary py-2 px-4 text-xs font-bold rounded-xl mt-2 w-full text-center"
                  >
                    Start Quiz
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Quiz Session Active screen */}
      {sessionActive && (
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center bg-bg-card p-4 border border-border-color rounded-2xl shadow-sm">
            <div className="text-left">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {selectedTopic ? selectedTopic.replace('-', ' ') : 'Quiz'}
              </span>
              <h3 className="font-extrabold text-base">
                Question {currentIndex + 1} of {questions.length}
              </h3>
            </div>

            {/* Timer visual block */}
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-3.5 py-1.5 rounded-full text-sm font-semibold">
              <FiClock className={timeLeft <= 5 ? 'animate-pulse' : ''} />
              <span>{timeLeft}s</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-bar-container h-2 mt-[-10px]">
            <div
              className="progress-bar-fill h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="glass-card p-6 sm:p-8 border-border-color shadow-lg flex flex-col gap-6">
            <h4 className="text-lg font-extrabold text-left leading-relaxed">
              {questions[currentIndex]?.prompt}
            </h4>

            {renderQuestionUI()}

            {/* Submit / Next Button */}
            <div className="border-t border-border-color/50 pt-5 flex justify-end gap-3">
              {!isAnswered ? (
                <button
                  onClick={checkAnswer}
                  disabled={
                    questions[currentIndex]?.type === 'fill'
                      ? !fillAnswer.trim()
                      : questions[currentIndex]?.type === 'dragdrop'
                      ? false
                      : !selectedOption
                  }
                  className={`btn-primary py-2.5 px-6 text-sm rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md ${
                    ((questions[currentIndex]?.type === 'fill' && !fillAnswer.trim()) ||
                      (questions[currentIndex]?.type !== 'fill' &&
                        questions[currentIndex]?.type !== 'dragdrop' &&
                        !selectedOption)) &&
                    'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn-success py-2.5 px-6 text-sm rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  {currentIndex + 1 < questions.length ? (
                    <>
                      Next Question <FiArrowRight />
                    </>
                  ) : (
                    <>
                      Show Results <FiCheck />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Results Screen */}
      {showResults && sessionSummary && (
        <div className="max-w-md mx-auto w-full glass-card p-8 border-border-color shadow-2xl text-center flex flex-col gap-6">
          <div>
            <span className="text-5xl">🏆</span>
            <h3 className="text-2xl font-black mt-4">Quiz Completed!</h3>
            <p className="text-sm text-text-muted mt-1">
              You completed the {selectedTopic ? selectedTopic.replace('-', ' ') : 'topic'} quiz
            </p>
          </div>

          {/* Results Score Box */}
          <div className="bg-bg-secondary p-5 border border-border-color rounded-2xl flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-muted">Correct Answers:</span>
              <span className="text-emerald-500 font-bold">
                {sessionSummary.correct} / {sessionSummary.total}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-muted">Accuracy:</span>
              <span className="text-primary font-bold">
                {Math.round(sessionSummary.percentage)}%
              </span>
            </div>
            <div className="border-b border-border-color/50 my-1" />
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-text-primary">Rewards Earned:</span>
              <span className="text-accent flex items-center gap-1">
                ⭐ +{sessionSummary.stars} &bull; +{sessionSummary.xp} XP &bull; +15 🪙
              </span>
            </div>
          </div>

          <div className="text-sm text-text-secondary italic">
            {sessionSummary.percentage >= 80
              ? 'Awesome! You have mastered this concept!'
              : sessionSummary.percentage >= 50
              ? 'Good job, but you can get a higher score!'
              : 'Keep studying the lesson and try again!'}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => startQuiz(selectedTopic)}
              className="btn-secondary py-3 px-6 text-sm rounded-xl flex-1 flex items-center justify-center gap-1.5"
            >
              <FiRotateCcw /> Retry
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                setSelectedTopic(null);
              }}
              className="btn-primary py-3 px-6 text-sm rounded-xl flex-1 flex items-center justify-center gap-1.5"
            >
              <FiList /> All Quizzes
            </button>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
