import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { LESSONS } from '../data/lessons';
import PageWrapper from '../components/layout/PageWrapper';
import { FiArrowLeft, FiHeart, FiEdit3, FiPlay, FiCheck } from 'react-icons/fi';
import confetti from 'canvas-confetti';

export default function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { state: gameState, dispatch, addReward } = useGame();

  const lesson = LESSONS.find(l => l.id === lessonId);
  const [noteText, setNoteText] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  
  // Playground state
  const [userCode, setUserCode] = useState('');
  const [playgroundOutput, setPlaygroundOutput] = useState('');

  useEffect(() => {
    if (lesson) {
      // Load saved note if exists
      setNoteText(gameState.notes[lesson.id] || '');
      // Initialize playground with the first code block if available
      const firstCodeBlock = lesson.content.find(block => block.type === 'code');
      setUserCode(firstCodeBlock ? firstCodeBlock.value : 'print("Hello, Python!")');
      setPlaygroundOutput('');
    }
  }, [lessonId, lesson, gameState.notes]);

  if (!lesson) {
    return (
      <PageWrapper className="text-center py-20">
        <h2 className="text-3xl font-extrabold">Lesson not found</h2>
        <Link to="/learning-path" className="btn-primary mt-6 inline-block">
          Return to Path
        </Link>
      </PageWrapper>
    );
  }

  const isBookmarked = gameState.bookmarkedLessons.includes(lesson.id);
  const isCompleted = gameState.completedLessons.includes(lesson.id);

  const handleToggleBookmark = () => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: lesson.id });
  };

  const handleSaveNote = (e) => {
    const text = e.target.value;
    setNoteText(text);
    dispatch({ type: 'SAVE_NOTE', payload: { id: lesson.id, text } });
  };

  const handleRunCode = () => {
    setPlaygroundOutput('Running code...');
    // Simple client side evaluation mockup for Python prints
    setTimeout(() => {
      try {
        // Look for print() statements and extract content
        const lines = userCode.split('\n');
        const prints = [];
        
        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
            const inner = trimmed.substring(6, trimmed.length - 1).trim();
            // simple evaluation
            if (inner.startsWith('"') && inner.endsWith('"')) {
              prints.push(inner.slice(1, -1));
            } else if (inner.startsWith("'") && inner.endsWith("'")) {
              prints.push(inner.slice(1, -1));
            } else {
              // try simple arithmetic or variables
              prints.push(`Output: ${inner}`);
            }
          }
        });

        if (prints.length > 0) {
          setPlaygroundOutput(prints.join('\n'));
        } else {
          setPlaygroundOutput('Code ran successfully with no printed output.');
        }
      } catch (err) {
        setPlaygroundOutput(`SyntaxError: check your print statements`);
      }
    }, 400);
  };

  const handleCompleteLesson = () => {
    if (!isCompleted) {
      // Award stars, XP
      addReward(lesson.starsReward, lesson.xpReward);
      dispatch({ type: 'COMPLETE_LESSON', payload: lesson.id });
      
      // Fire confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <PageWrapper className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 relative text-left">
      {/* Main Content Area */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/learning-path')}
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors font-bold"
          >
            <FiArrowLeft /> Back to Path
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`p-2.5 rounded-xl border transition-all duration-200 focus:outline-none ${
                isBookmarked
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                  : 'bg-bg-card border-border-color text-text-secondary hover:text-text-primary'
              }`}
              title="Bookmark Lesson"
            >
              <FiHeart className={isBookmarked ? 'fill-rose-500' : ''} size={18} />
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-2.5 rounded-xl border transition-all duration-200 focus:outline-none lg:hidden ${
                showNotes
                  ? 'bg-primary/10 border-primary/20 text-primary'
                  : 'bg-bg-card border-border-color text-text-secondary hover:text-text-primary'
              }`}
              title="Toggle Notes"
            >
              <FiEdit3 size={18} />
            </button>
          </div>
        </div>

        {/* Lesson Headings */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-text-primary">
            {lesson.title}
          </h2>
          <div className="flex items-center gap-3 text-xs text-text-muted mt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase">
              {lesson.pathId} path
            </span>
            <span>&bull;</span>
            <span>⏱️ {lesson.duration}</span>
            <span>&bull;</span>
            <span>⭐ {lesson.starsReward} Stars</span>
            <span>&bull;</span>
            <span>{lesson.xpReward} XP</span>
          </div>
        </div>

        {/* Lesson Body Content */}
        <div className="glass-card p-6 sm:p-8 border-border-color shadow-lg flex flex-col gap-6">
          {lesson.content.map((block, idx) => {
            if (block.type === 'text') {
              return (
                <p key={idx} className="text-text-secondary text-base leading-relaxed whitespace-pre-line">
                  {block.value}
                </p>
              );
            }
            if (block.type === 'code') {
              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs text-text-muted bg-bg-secondary px-4 py-2 border border-border-color rounded-t-xl">
                    <span>Python Example</span>
                    <button
                      onClick={() => setUserCode(block.value)}
                      className="text-primary font-bold hover:underline"
                    >
                      Load in Playground
                    </button>
                  </div>
                  <pre className="code-block rounded-t-none font-mono text-left text-sm leading-relaxed p-4 border border-border-color shadow-inner">
                    <code>{block.value}</code>
                  </pre>
                </div>
              );
            }
            return null;
          })}

          {/* Key Takeaways */}
          {lesson.keyTakeaways && (
            <div className="mt-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="font-bold text-primary mb-3">💡 Key Takeaways</h4>
              <ul className="list-disc list-inside text-sm text-text-secondary flex flex-col gap-2">
                {lesson.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Interactive Try-it-yourself Playground */}
        <div className="glass-card p-6 border-border-color shadow-lg flex flex-col gap-4 text-left">
          <h3 className="font-extrabold text-lg flex items-center gap-2">
            🎮 Try it Yourself!
          </h3>
          <p className="text-xs text-text-muted mt-[-10px]">
            Edit the code below and press run. Python statements like print("text") will print to output!
          </p>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="code-block w-full h-40 font-mono text-sm leading-relaxed p-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
            spellCheck={false}
          />

          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handleRunCode}
              className="btn-primary py-2 px-5 text-sm rounded-xl flex items-center gap-2 font-bold shadow-md hover:scale-103 transition-all"
            >
              <FiPlay size={14} /> Run Code
            </button>
            <span className="text-xs text-text-muted">Runs locally in sandbox</span>
          </div>

          {playgroundOutput && (
            <div className="mt-2 text-left">
              <p className="text-xs font-bold text-text-muted mb-1">Execution Output:</p>
              <pre className="p-3 bg-bg-secondary border border-border-color rounded-xl font-mono text-xs text-text-primary whitespace-pre-wrap">
                {playgroundOutput}
              </pre>
            </div>
          )}
        </div>

        {/* Action Button: Mark Complete */}
        <div className="flex gap-4 items-center justify-end mt-4">
          <Link to="/learning-path" className="btn-secondary py-3 px-6 text-sm rounded-xl">
            Cancel
          </Link>
          <button
            onClick={handleCompleteLesson}
            className={`py-3 px-8 text-sm font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all duration-200 ${
              isCompleted
                ? 'bg-emerald-500 text-white cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {isCompleted ? (
              <>
                <FiCheck /> Lesson Completed!
              </>
            ) : (
              `Mark Lesson Complete (+${lesson.xpReward} XP)`
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Sticky Sidebar for Notes */}
      <div className={`lg:col-span-1 lg:block ${showNotes ? 'block' : 'hidden'}`}>
        <div className="sticky top-20 glass-card p-6 border-border-color shadow-lg flex flex-col gap-4 text-left h-[calc(100vh-12rem)]">
          <h3 className="font-extrabold text-lg flex items-center gap-2">
            📝 Lesson Notepad
          </h3>
          <p className="text-xs text-text-muted mt-[-10px]">
            Write and save your notes locally for this topic. They are auto-saved!
          </p>

          <textarea
            value={noteText}
            onChange={handleSaveNote}
            placeholder="Type your notes here... (e.g. print() writes text to console, variables are containers, etc.)"
            className="flex-1 w-full p-4 bg-bg-secondary border border-border-color rounded-xl text-sm leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-text-primary resize-none font-sans"
          />
          <div className="text-xs text-text-muted text-right">
            Auto-saved to LocalStorage
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
