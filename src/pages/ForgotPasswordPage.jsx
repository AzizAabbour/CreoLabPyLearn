import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <PageWrapper className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="glass-card w-full max-w-md p-8 border-border-color shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-4xl">🔑</span>
          <h2 className="text-3xl font-extrabold mt-4">Reset Password</h2>
          <p className="text-sm text-text-muted mt-2">
            Enter your email to receive recovery instructions
          </p>
        </div>

        {submitted ? (
          <div className="text-center flex flex-col gap-5 py-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-medium">
              📩 Password reset link sent to <strong>{email}</strong>!
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              We've sent a mock recovery link. Please check your inbox and click the link to reset your password.
            </p>
            <Link to="/login" className="btn-primary py-3 rounded-xl font-bold mt-2">
              Back to Login
            </Link>
          </div>
        ) : (
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

            <button type="submit" className="btn-primary py-3 rounded-xl mt-2 font-bold">
              Send Reset Link
            </button>

            <Link to="/login" className="text-center text-sm text-primary hover:underline font-semibold mt-4">
              Return to Login
            </Link>
          </form>
        )}
      </div>
    </PageWrapper>
  );
}
