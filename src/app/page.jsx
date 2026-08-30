'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '@/lib/api';
import ArtworkCard from '@/components/ArtworkCard';
import { ArrowRight, Sparkles, Award, Grid, Compass } from 'lucide-react';

export default function Home() {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Featured Categories as requested in assignment
  const categories = [
    { name: 'Digital Painting', count: '120+ Arts', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600' },
    { name: '3D Art', count: '85+ Arts', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600' },
    { name: 'Illustration', count: '95+ Arts', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600' },
    { name: 'Abstract', count: '110+ Arts', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600' }
  ];

  // Top Artists data for display
  const topArtists = [
    { name: 'Elena Rostova', sales: '48 Sales', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', tag: 'Top Seller' },
    { name: 'Marcus Vance', sales: '36 Sales', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', tag: 'Featured' },
    { name: 'Aria Chen', sales: '29 Sales', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', tag: 'Trending' }
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get('/artworks');
        
        // Extract array safely regardless of response format
        let dataArray = [];
        if (Array.isArray(res?.data)) {
          dataArray = res.data;
        } else if (Array.isArray(res?.data?.artworks)) {
          dataArray = res.data.artworks;
        } else if (Array.isArray(res?.data?.data)) {
          dataArray = res.data.data;
        }

        setFeaturedArtworks(dataArray.slice(0, 6)); // Display latest 6
      } catch (err) {
        console.error('Error fetching featured artworks:', err);
        setFeaturedArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800 py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-4 h-4" /> Discover Premium Digital Artworks
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Buy & Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Extraordinary</span> Digital Art
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Connect directly with world-class digital artists, collect verified original masterpieces, and trade securely with Stripe.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/artworks"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Compass className="w-5 h-5" /> Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Featured Artworks</h2>
            <p className="text-slate-400 text-sm mt-1">Explore hand-picked digital creations from global creators</p>
          </div>
          <Link href="/artworks" className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtworks.map((art) => (
              <ArtworkCard key={art._id} artwork={art} />
            ))}
          </div>
        )}
      </section>

      {/* Extra Section 1: Top Artists */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" /> Top Creators
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Top Artists of the Month</h2>
          <p className="text-slate-400 text-sm">Recognizing artists with highest collector sales and engagement</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topArtists.map((artist, idx) => (
            <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4 hover:border-slate-700 transition-all">
              <img src={artist.avatar} alt={artist.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-indigo-500/50" />
              <div>
                <h3 className="font-bold text-white text-lg">{artist.name}</h3>
                <p className="text-xs text-indigo-400 font-medium">{artist.sales}</p>
              </div>
              <span className="inline-block text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-semibold">
                {artist.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 2: Art Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Grid className="w-6 h-6 text-indigo-500" /> Explore by Category
            </h2>
            <p className="text-slate-400 text-sm mt-1">Browse artworks tailored to your favorite art mediums</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/artworks?category=${encodeURIComponent(cat.name)}`}
              className="group relative h-64 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all shadow-xl"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
                <span className="text-xs text-slate-300 font-medium">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}