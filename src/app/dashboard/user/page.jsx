'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import API from '@/lib/api';
import Link from 'next/link';
import { ShoppingBag, Crown, CheckCircle, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTier, setCurrentTier] = useState(user?.subscriptionTier || 'free');

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.email) return;
      try {
        const res = await API.get(`/user/purchases/${user.email}`);
        setPurchases(res.data);
      } catch (err) {
        console.error('Failed to fetch purchases:', err);
      } font-medium {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const handleUpgradeTier = async (tier) => {
    try {
      const res = await API.patch('/user/subscription', {
        email: user.email,
        tier
      });
      setCurrentTier(res.data.user.subscriptionTier);
      alert(res.data.message);
    } catch (err) {
      alert('Failed to upgrade subscription tier.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-10 text-center space-y-4">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-slate-400">Loading your collection & dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-indigo-500" /> Collector Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your subscription tier, track artwork purchases, and view your digital art collection.
        </p>
      </div>

      {/* Subscription Tier Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <Crown className="w-5 h-5 text-amber-400" /> Subscription Plan Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className={`p-6 bg-slate-900 border rounded-2xl flex flex-col justify-between ${currentTier === 'free' ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-800'}`}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Free Plan</span>
                {currentTier === 'free' && <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full border border-indigo-500/30 font-semibold">Active</span>}
              </div>
              <div className="text-3xl font-black text-white">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></div>
              <p className="text-xs text-slate-400">Max 3 Artwork Purchases Allowed</p>
            </div>
            <button 
              disabled={currentTier === 'free'} 
              onClick={() => handleUpgradeTier('free')} 
              className="mt-6 w-full py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all"
            >
              {currentTier === 'free' ? 'Current Plan' : 'Downgrade'}
            </button>
          </div>

          {/* Pro Tier */}
          <div className={`p-6 bg-slate-900 border rounded-2xl flex flex-col justify-between ${currentTier === 'pro' ? 'border-purple-500 ring-1 ring-purple-500' : 'border-slate-800'}`}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Pro Collector</span>
                {currentTier === 'pro' && <span className="bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/30 font-semibold">Active</span>}
              </div>
              <div className="text-3xl font-black text-white">$9.99 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400">Max 9 Artwork Purchases Allowed</p>
            </div>
            <button 
              disabled={currentTier === 'pro'} 
              onClick={() => handleUpgradeTier('pro')} 
              className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-purple-600/20"
            >
              {currentTier === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Premium Tier */}
          <div className={`p-6 bg-slate-900 border rounded-2xl flex flex-col justify-between ${currentTier === 'premium' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-slate-800'}`}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Premium VIP</span>
                {currentTier === 'premium' && <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full border border-amber-500/30 font-semibold">Active</span>}
              </div>
              <div className="text-3xl font-black text-white">$19.99 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400">Unlimited Artwork Purchases & Priority Support</p>
            </div>
            <button 
              disabled={currentTier === 'premium'} 
              onClick={() => handleUpgradeTier('premium')} 
              className="mt-6 w-full py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-amber-600/20"
            >
              {currentTier === 'premium' ? 'Current Plan' : 'Upgrade to Premium'}
            </button>
          </div>
        </div>
      </div>

      {/* Bought Artworks Gallery */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <ImageIcon className="w-5 h-5 text-indigo-400" /> Purchased Collection Gallery
        </h2>
        {purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((item) => (
              <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all">
                <img 
                  src={item.artworkId?.imageUrl || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675'} 
                  alt={item.artworkId?.title || 'Artwork'} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-white text-lg line-clamp-1">{item.artworkId?.title || 'Original Art'}</h3>
                  <p className="text-xs text-slate-400">Artist: <span className="text-slate-200">{item.artworkId?.artistName || 'Unknown'}</span></p>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 font-bold">${item.amount}</span>
                    <Link href={`/artworks/${item.artworkId?._id}`} className="text-indigo-400 hover:text-indigo-300 text-xs font-medium flex items-center gap-1">
                      View Details <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
            You haven't purchased any artwork yet. Explore the marketplace to build your gallery!
          </div>
        )}
      </div>

      {/* Purchase History Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Purchase History Records</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-bold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Artwork Name</th>
                  <th className="px-6 py-4">Artist Name</th>
                  <th className="px-6 py-4">Price Paid</th>
                  <th className="px-6 py-4">Purchase Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {purchases.length > 0 ? (
                  purchases.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{p.artworkId?.title || 'Original Art'}</td>
                      <td className="px-6 py-4 text-slate-400">{p.artworkId?.artistName || 'Artist'}</td>
                      <td className="px-6 py-4 font-extrabold text-emerald-400">${p.amount}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                      No transaction records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}