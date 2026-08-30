import Link from 'next/link';
import { Compass, HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400">
        <Compass className="w-12 h-12 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-black text-white tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-slate-200">Masterpiece Not Found</h2>
        <p className="text-slate-400 max-w-md text-sm">
          The page or artwork you are looking for doesn't exist, has been removed, or moved to another canvas.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm"
      >
        <HomeIcon className="w-4 h-4" /> Back to Home Page
      </Link>
    </div>
  );
}