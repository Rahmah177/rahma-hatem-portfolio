import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { personalInfo as me } from '../data/personalInfo';

export default function NotFound() {
  useEffect(() => { document.title = `Page not found | ${me.name}`; }, []);
  return (
    <section className="wrap grid min-h-[60svh] content-center gap-4 py-20">
      <h1 className="text-6xl font-extrabold text-aub">Page not found</h1>
      <p className="text-soft">This page doesn't exist or has moved.</p>
      <Link to="/" className="inline-flex min-h-11 items-center font-semibold text-plum">Back to home</Link>
    </section>
  );
}
