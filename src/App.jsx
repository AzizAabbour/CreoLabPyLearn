import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

// Layouts
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import LearningPathPage from './pages/LearningPathPage';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import ChallengesPage from './pages/ChallengesPage';
import ChallengeSolvePage from './pages/ChallengeSolvePage';
import GamesPage from './pages/GamesPage';
import GamePlayPage from './pages/GamePlayPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import AchievementsPage from './pages/AchievementsPage';
import CertificatesPage from './pages/CertificatesPage';
import MentorPage from './pages/MentorPage';
import DailyPage from './pages/DailyPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// App Layout Controller
function AppLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if current page is a public / landing page
  const isPublicPage = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname);

  // Sidebar is only shown if user is authenticated and not on a public page
  const showSidebar = isAuthenticated && !isPublicPage;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 relative">
        {showSidebar && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <main
          className={`flex-1 transition-all duration-300 w-full ${
            showSidebar ? 'lg:pl-64' : ''
          }`}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
            <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPasswordPage />} />

            {/* Protected Dashboard/App Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/learning-path" element={<ProtectedRoute><LearningPathPage /></ProtectedRoute>} />
            <Route path="/lesson/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
            <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
            <Route path="/challenges/:id" element={<ProtectedRoute><ChallengeSolvePage /></ProtectedRoute>} />
            <Route path="/games" element={<ProtectedRoute><GamesPage /></ProtectedRoute>} />
            <Route path="/games/:gameId" element={<ProtectedRoute><GamePlayPage /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
            <Route path="/certificates" element={<ProtectedRoute><CertificatesPage /></ProtectedRoute>} />
            <Route path="/mentor" element={<ProtectedRoute><MentorPage /></ProtectedRoute>} />
            <Route path="/daily" element={<ProtectedRoute><DailyPage /></ProtectedRoute>} />

            {/* fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>

      {!showSidebar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GameProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
