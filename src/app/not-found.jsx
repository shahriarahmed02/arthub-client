'use client';

import Link from 'next/link';
import { Compass, HomeIcon, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-md mx-auto">
        
        {/* Animated Icon Container */}
        <div className="inline-flex p-5 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl shadow-indigo-500/10 text-indigo-400">
          <Compass className="w-12 h-12 animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Heading & Details */}
        <div className="space-y-3">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Error 404
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Artwork Not Found
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page or masterpiece you are looking for doesn't exist, has been removed, or moved to another canvas.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all text-sm active:scale-95"
          >
            <HomeIcon className="w-4 h-4" /> Back to Home Page
          </Link>
          
          <Link
            href="/artworks"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold rounded-xl transition-all text-sm hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Artworks
          </Link>
        </div>

      </div>
    </div>
  );
}