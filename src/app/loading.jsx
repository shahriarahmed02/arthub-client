'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <Loader2 className="w-6 h-6 text-indigo-400 absolute animate-pulse" />
      </div>
      <p className="text-slate-400 text-sm font-medium tracking-wide animate-pulse">
        Loading ArtHub Marketplace...
      </p>
    </div>
  );
}