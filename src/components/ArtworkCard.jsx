'use client';

import Link from 'next/link';
import { Eye, Tag, User } from 'lucide-react';

export default function ArtworkCard({ artwork }) {
  return (
    <div className="card bg-base-100/80 backdrop-blur-md border border-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
      <figure className="relative h-60 w-full overflow-hidden bg-base-300">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {artwork.isSold && (
          <div className="absolute top-3 right-3 bg-error text-error-content text-xs font-bold px-3 py-1 rounded-full shadow-md">
            SOLD OUT
          </div>
        )}
        <div className="absolute top-3 left-3 bg-base-100/90 text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {artwork.category}
        </div>
      </figure>

      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
          {artwork.title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-base-content/70 my-1">
          <User className="w-4 h-4 text-primary" />
          <span className="font-medium line-clamp-1">{artwork.artistName}</span>
        </div>

        <div className="card-actions items-center justify-between mt-4 pt-3 border-t border-base-200">
          <div>
            <span className="text-xs text-base-content/60 block">Price</span>
            <span className="text-xl font-extrabold text-primary">${artwork.price}</span>
          </div>
          <Link
            href={`/artworks/${artwork._id}`}
            className="btn btn-primary btn-sm rounded-lg gap-2 shadow-md hover:shadow-primary/50"
          >
            <Eye className="w-4 h-4" /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}