import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiAward } from 'react-icons/fi';

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { state: gameState } = useGame();
  const { isDark, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-card border-none rounded-none shadow-md px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={onMenuToggle}
              className="p-2 text-text-secondary hover:text-text-primary focus:outline-none lg:hidden rounded-lg hover:bg-bg-secondary"
              aria-label="Toggle Menu"
            >
              {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          )}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 font-sans font-extrabold text-2xl tracking-tight">
            <span className="text-primary">CreoLab</span>
            <span className="text-accent">PyLearn</span>
            <span className="text-xl">🐍</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Gamification Stats */}
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-4 text-sm font-semibold">
              {/* Streak */}
              <div className="flex items-center gap-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/20">
                <span className="streak-fire text-base">🔥</span>
                <span>{gameState.streak} days</span>
              </div>
              {/* Stars */}
              <div className="flex items-center gap-1 bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-500/20">
                <span>⭐</span>
                <span>{gameState.stars}</span>
              </div>
              {/* Coins */}
              <div className="flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <span>🪙</span>
                <span>{gameState.coins}</span>
              </div>
              {/* Level */}
              <div className="flex items-center gap-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-dark px-3 py-1.5 rounded-full border border-primary/20">
                <FiAward />
                <span>Lvl {gameState.level}</span>
              </div>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-bg-secondary text-text-secondary hover:text-text-primary transition-all duration-200 border border-border-color focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* User Profile / Login */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full focus:outline-none hover:bg-bg-secondary border border-transparent hover:border-border-color transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xl shadow-inner border border-primary/20">
                  {user.avatar || '🐍'}
                </div>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-bg-card border border-border-color shadow-2xl p-2 z-40 animate-[scaleIn_0.15s_ease-out]">
                    <div className="px-4 py-2 border-b border-border-color mb-1">
                      <p className="font-bold text-text-primary truncate">{user.username}</p>
                      <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-all duration-150"
                    >
                      <FiUser size={16} />
                      My Profile
                    </Link>
                    <Link
                      to="/achievements"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-all duration-150"
                    >
                      <FiAward size={16} />
                      Achievements
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 rounded-lg transition-all duration-150 text-left font-medium border-t border-border-color mt-1 pt-2"
                    >
                      <FiLogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-secondary py-2 px-4 text-sm rounded-xl">
                Login
              </Link>
              <Link to="/register" className="btn-primary py-2 px-4 text-sm rounded-xl hidden md:inline-block">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
