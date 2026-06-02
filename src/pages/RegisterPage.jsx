import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageWrapper from '../components/layout/PageWrapper';

export default function RegisterPage() {
  const { register, DEFAULT_AVATARS } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🐍');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const res = register(username, email, password, selectedAvatar);
    if (res.success) {
      setSuccess(res.message);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setError(res.message);
    }
  };

  return (
    <PageWrapper className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="glass-card w-full max-w-lg p-8 border-border-color shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-4xl">🌱</span>
          <h2 className="text-3xl font-extrabold mt-4">Create Account</h2>
          <p className="text-sm text-text-muted mt-2">
            Start your gamified learning adventure
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold text-center">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-semibold text-center animate-pulse">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-bold text-text-secondary">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. PythonPro"
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-bold text-text-secondary">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@creolab.com"
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-sm font-bold text-text-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-bold text-text-secondary">
              Choose your Avatar {selectedAvatar}
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-3 bg-bg-secondary rounded-2xl border border-border-color max-h-36 overflow-y-auto">
              {DEFAULT_AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-9 h-9 flex items-center justify-center text-xl rounded-xl border-2 transition-all duration-150 hover:scale-110 ${
                    selectedAvatar === av
                      ? 'border-primary bg-primary/10'
                      : 'border-transparent hover:bg-bg-card'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary py-3 rounded-xl mt-2 font-bold">
            Register Account
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Log in here
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}
