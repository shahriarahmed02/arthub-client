'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '@/lib/api';
import ArtworkCard from '@/components/ArtworkCard';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Palette } from 'lucide-react';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/artworks/featured')
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 py-24 px-4 md:px-12 text-center rounded-b-3xl border-b border-base-200">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm animate-pulse">
            <Sparkles className="w-4 h-4" /> Discover Premium Digital Art
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Buy & Sell Extraordinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Artworks</span>
          </h1>
          <p className="text-lg text-base-content/80 max-w-xl mx-auto">
            Connect directly with world-class digital artists, collect verified original masterpieces, and trade securely with Stripe.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/artworks" className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-primary/50">
              Explore Marketplace <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/register" className="btn btn-outline btn-lg">
              Join as Artist
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Verified Purchases</h3>
            <p className="text-sm text-base-content/70">Only verified buyers can review and comment on sold artworks.</p>
          </div>

          <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all text-center space-y-3">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Instant Stripe Checkout</h3>
            <p className="text-sm text-base-content/70">Fast, secure payments with global credit and debit cards.</p>
          </div>

          <div className="p-6 rounded-2xl bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all text-center space-y-3">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mx-auto">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Tiered Artist Plans</h3>
            <p className="text-sm text-base-content/70">Flexible purchase quotas tailored for casual & professional collectors.</p>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-base-200 pb-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Featured Artworks</h2>
            <p className="text-base-content/70 text-sm mt-1">Handpicked fresh creations from our top creators</p>
          </div>
          <Link href="/artworks" className="btn btn-ghost text-primary font-bold gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-base-300 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.length > 0 ? (
              featured.map((art) => <ArtworkCard key={art._id} artwork={art} />)
            ) : (
              <p className="col-span-full text-center py-12 text-base-content/60">No featured artworks found right now.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}