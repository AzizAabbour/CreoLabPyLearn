import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';

export default function NotFoundPage() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center py-24 text-center">
      <span className="text-8xl">🐍</span>
      <h2 className="text-4xl font-extrabold mt-6 text-text-primary">
        404 — Syntax Error
      </h2>
      <p className="text-text-secondary mt-3 max-w-md leading-relaxed text-sm">
        The page you are looking for has encountered an unresolved reference. Let's redirect you to the main script!
      </p>
      <Link to="/" className="btn-primary mt-8 rounded-xl font-bold py-3 px-8 shadow-md">
        Back to Safety (Home)
      </Link>
    </PageWrapper>
  );
}
