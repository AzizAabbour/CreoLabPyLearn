import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_AVATARS = [
  '🐍', '🚀', '💻', '🎮', '🧠', '⚡', '🔥', '🌟', '🎯', '🏆',
  '👨‍💻', '👩‍💻', '🤖', '🦊', '🐲', '🦄', '🎨', '🔮', '💎', '🌈'
];

const DEFAULT_USER = {
  id: null,
  username: '',
  email: '',
  avatar: '🐍',
  joinDate: null,
  bio: 'Python learner on CreoLabPyLearn!',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('creolab-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('creolab-user'));

  useEffect(() => {
    if (user) {
      localStorage.setItem('creolab-user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('creolab-user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const register = (username, email, password, avatar = '🐍') => {
    const existingUsers = JSON.parse(localStorage.getItem('creolab-users') || '[]');
    if (existingUsers.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    if (existingUsers.find(u => u.username === username)) {
      return { success: false, message: 'Username already taken' };
    }
    const newUser = {
      ...DEFAULT_USER,
      id: Date.now().toString(),
      username,
      email,
      avatar,
      joinDate: new Date().toISOString(),
    };
    existingUsers.push({ ...newUser, password });
    localStorage.setItem('creolab-users', JSON.stringify(existingUsers));
    setUser(newUser);
    return { success: true, message: 'Registration successful!' };
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('creolab-users') || '[]');
    const found = existingUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      const existingUsers = JSON.parse(localStorage.getItem('creolab-users') || '[]');
      const idx = existingUsers.findIndex(u => u.id === updated.id);
      if (idx !== -1) {
        existingUsers[idx] = { ...existingUsers[idx], ...updates };
        localStorage.setItem('creolab-users', JSON.stringify(existingUsers));
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      register,
      login,
      logout,
      updateProfile,
      DEFAULT_AVATARS,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
