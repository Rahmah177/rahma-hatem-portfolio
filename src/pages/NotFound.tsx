import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60svh] content-center gap-4 py-20">
      <h1 className="text-6xl font-extrabold text-aub">Page not found</h1>
      <p className="text-soft">This page doesn't exist or has moved.</p>
      <Link to="/" className="font-semibold text-plum">Back to home</Link>
    </section>
  );
}
