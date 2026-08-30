'use client';

import { useState, useEffect } from 'react';
import API from '@/lib/api';
import ArtworkCard from '@/components/ArtworkCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const res = await API.get('/artworks', {
        params: { search, category, sort }
      });
      setArtworks(res.data.artworks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [category, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArtworks();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Explore Marketplace</h1>
        <p className="text-base-content/70">Filter, search, and discover your next favorite digital masterpiece</p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-base-100/90 backdrop-blur border border-base-200 rounded-2xl shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-1 min-w-[280px]">
          <div className="relative w-full">
            <Search className="w-5 h-5 absolute left-3 top-3 text-base-content/50" />
            <input
              type="text"
              placeholder="Search artwork title..."
              className="input input-bordered w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Digital Painting">Digital Painting</option>
            <option value="3D Art">3D Art</option>
            <option value="Illustration">Illustration</option>
            <option value="Abstract">Abstract</option>
          </select>

          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by: Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Artwork Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-80 bg-base-300 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : artworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <ArtworkCard key={art._id} artwork={art} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3">
          <p className="text-lg font-semibold text-base-content/60">No artworks found matching your criteria.</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setSort(''); fetchArtworks(); }} className="btn btn-outline btn-sm gap-2">
            <RefreshCw className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}