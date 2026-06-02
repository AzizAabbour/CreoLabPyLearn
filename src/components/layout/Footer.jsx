import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-bg-card border-t border-border-color py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-bold text-text-primary text-lg">
            CreoLab<span className="text-accent">PyLearn</span> 🐍
          </p>
          <p className="text-xs text-text-muted mt-1">
            Learn Python through gamification. Quizzes, games, and challenges.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <span className="text-text-muted">
            &copy; {new Date().getFullYear()} CreoLab. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
