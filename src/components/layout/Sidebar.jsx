import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiBookOpen,
  FiCheckSquare,
  FiCode,
  FiAward,
  FiTrendingUp,
  FiMessageSquare,
  FiCalendar,
  FiGift
} from 'react-icons/fi';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: FiHome },
  { path: '/learning-path', label: 'Learn Python', icon: FiBookOpen },
  { path: '/quiz', label: 'Quizzes', icon: FiCheckSquare },
  { path: '/challenges', label: 'Coding Challenges', icon: FiCode },
  { path: '/games', label: 'Mini Games', icon: FiCalendar }, // Let's use a nice icon for games
  { path: '/leaderboard', label: 'Leaderboard', icon: FiTrendingUp },
  { path: '/mentor', label: 'AI Mentor', icon: FiMessageSquare },
  { path: '/daily', label: 'Daily Quests', icon: FiGift },
  { path: '/achievements', label: 'Achievements', icon: FiAward },
  { path: '/certificates', label: 'Certificates', icon: FiAward },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-16 left-0 z-30 w-64 bg-bg-card border-r border-border-color p-4 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1.5 h-full overflow-y-auto pb-10">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}
