import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageWrapper from '../components/layout/PageWrapper';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const res = login(email, password);
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
      <div className="glass-card w-full max-w-md p-8 border-border-color shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-4xl">🐍</span>
          <h2 className="text-3xl font-extrabold mt-4">Welcome Back!</h2>
          <p className="text-sm text-text-muted mt-2">
            Log in to continue your Python journey
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-secondary">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn-primary py-3 rounded-xl mt-2 font-bold">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-8">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </PageWrapper>
  );
}
