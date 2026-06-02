import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMap, FiCheckCircle, FiTerminal, FiAward, FiCpu, FiUsers, FiStar, FiActivity } from 'react-icons/fi';
import PageWrapper from '../components/layout/PageWrapper';

const features = [
  {
    icon: FiMap,
    title: 'Interactive Roadmap',
    description: 'Follow 4 paths (Beginner to Expert) with 28 structured lessons and step-by-step progress tracking.',
    color: 'text-primary bg-primary/10 border-primary/20'
  },
  {
    icon: FiCheckCircle,
    title: 'Rich Quizzes',
    description: 'Test your understanding with 7 different question types: MCQ, True/False, Drag & Drop, Fill-in, and more.',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    icon: FiTerminal,
    title: 'Coding Arena',
    description: 'Solve 50+ real python challenges inside a full Monaco code editor with instant client-side testing.',
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20'
  },
  {
    icon: FiCpu,
    title: '8 Gamified Puzzles',
    description: 'Master concepts playing mini-games like Syntax Hunter, Bug Fixer, Output Master, and Python Maze.',
    color: 'text-accent bg-accent/10 border-accent/20'
  },
  {
    icon: FiAward,
    title: 'Badges & Level Up',
    description: 'Earn stars, coins, and unlock 30+ custom achievements and badges as you level up to Python Master.',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
  },
  {
    icon: FiActivity,
    title: 'AI Mentor & Analytics',
    description: 'Chat with our pre-built AI mentor for hints and review interactive calendar heatmaps and stats charts.',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
  }
];

const testimonials = [
  {
    quote: "This is literally the Duolingo for programming. The mini-games are addicting, and the challenges actually test your logic!",
    author: "Amine K.",
    role: "Computer Science Freshman"
  },
  {
    quote: "I passed my python exam thanks to the recursion quiz and the bug fixing game. CreoLabPyLearn makes learning code fun.",
    author: "Sarah L.",
    role: "IT Student"
  }
];

export default function LandingPage() {
  return (
    <PageWrapper className="pt-10 pb-20 overflow-hidden">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold w-fit">
            <span>✨ Gamified Python Learning</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Master Python. <br />
            <span className="gradient-text">Earning Stars & Badges.</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
            CreoLabPyLearn is the ultimate interactive platform for students and beginners. Solve challenges, play mini-games, earn certificates, and learn to code like a pro.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link to="/register" className="btn-primary py-3 px-8 text-base rounded-xl shadow-lg">
              Start Learning — Free
            </Link>
            <Link to="/login" className="btn-secondary py-3 px-8 text-base rounded-xl">
              I Already Have an Account
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-72 h-72 bg-primary/30 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute w-72 h-72 bg-accent/20 rounded-full blur-3xl -z-10 translate-x-12 translate-y-12" />
          
          <div className="glass-card p-6 border-border-color shadow-2xl relative float-animation max-w-md w-full">
            <div className="flex justify-between items-center border-b border-border-color pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-text-muted font-mono">python_quiz.py</span>
            </div>
            <pre className="code-block text-sm p-4 rounded-xl shadow-inner font-mono text-left leading-relaxed">
<code className="text-yellow-400">def</code> <code className="text-blue-400">learn_python</code>():
    stars = <code className="text-purple-400">0</code>
    skills = []
    
    <code className="text-yellow-400">while</code> <code className="text-blue-400">not</code> master:
        play_games()
        solve_quizzes()
        stars += <code className="text-purple-400">5</code>
        
    <code className="text-yellow-400">return</code> stars, certifications
            </pre>
            <div className="flex gap-4 mt-6 justify-around text-center text-sm font-semibold">
              <div>
                <p className="text-2xl font-black text-primary">28+</p>
                <p className="text-xs text-text-muted mt-1">Lessons</p>
              </div>
              <div className="border-r border-border-color" />
              <div>
                <p className="text-2xl font-black text-emerald-500">400+</p>
                <p className="text-xs text-text-muted mt-1">Quizzes</p>
              </div>
              <div className="border-r border-border-color" />
              <div>
                <p className="text-2xl font-black text-accent">8</p>
                <p className="text-xs text-text-muted mt-1">Games</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Section */}
      <div className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Fully Gamified Learning</h2>
          <p className="text-text-secondary mt-3 text-lg">
            Everything you need to master Python, in an environment built around motivation, rewards, and play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="stat-card card-hover flex flex-col gap-4 text-left"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Statistics Banner */}
      <div className="glass-card p-10 border-border-color text-center mb-24 relative overflow-hidden bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 font-sans">
          <div>
            <p className="text-4xl sm:text-5xl font-black text-primary">15,000+</p>
            <p className="text-sm text-text-secondary font-medium mt-1">Active Students</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-emerald-500">120K+</p>
            <p className="text-sm text-text-secondary font-medium mt-1">Quizzes Solved</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-accent">50K+</p>
            <p className="text-sm text-text-secondary font-medium mt-1">Challenges Solved</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-purple-500">1.2M+</p>
            <p className="text-sm text-text-secondary font-medium mt-1">Stars Earned</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Loved by Students</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card p-8 border-border-color text-left flex flex-col justify-between">
              <p className="text-text-secondary italic text-lg leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl">
                  🎓
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">{t.author}</h4>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="text-center bg-gradient-to-br from-primary/10 via-purple-500/5 to-accent/10 p-12 sm:p-20 rounded-3xl border border-border-color shadow-xl">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Start Your Journey Today</h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Unlock standard features, daily challenges, achievements, and master Python completely free of charge. No credit card required.
        </p>
        <Link to="/register" className="btn-primary py-4 px-10 text-lg rounded-xl shadow-lg hover:scale-105 active:scale-100 transition-all inline-block">
          Join CreoLabPyLearn Now
        </Link>
      </div>
    </PageWrapper>
  );
}
