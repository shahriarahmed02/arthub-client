'use client';

import Link from 'next/link';
import { Eye, Tag, User } from 'lucide-react';

export default function ArtworkCard({ artwork }) {
  return (
    <div className="group relative bg-slate-900/80 backdrop-blur-md border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      
      {/* Image Container with Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-950">
        <img
          src={artwork?.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={artwork?.title || 'Artwork'}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            artwork?.isSold ? 'grayscale opacity-75' : ''
          }`}
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-indigo-400 border border-slate-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-indigo-400" />
          <span className="capitalize">{artwork?.category || 'General'}</span>
        </div>

        {/* Sold Badge */}
        {artwork?.isSold && (
          <div className="absolute top-3 right-3 bg-rose-500/90 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border border-rose-400/30 backdrop-blur-sm">
            Sold Out
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        
        {/* Title & Artist */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 tracking-tight">
            {artwork?.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium truncate">{artwork?.artistName || 'Unknown Artist'}</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Price</span>
            <span className="text-xl font-black text-indigo-400 tracking-tight">
              ${artwork?.price}
            </span>
          </div>

          <Link
            href={`/artworks/${artwork?._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" /> View Details
          </Link>
        </div>

      </div>
    </div>
  );
}