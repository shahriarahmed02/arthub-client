'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import API from '@/lib/api';
import Link from 'next/link';
import { 
  Palette, 
  DollarSign, 
  PlusCircle, 
  Trash2, 
  Pencil, 
  Tag, 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  Search,
  CheckCircle2
} from 'lucide-react';

export default function ArtistDashboard() {
  const { user } = useContext(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState('artworks');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchArtistData = async () => {
      console.log("Current Logged-in User for Studio:", user);

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Updated with correct backend base path '/api/artist'
        const [artRes, salesRes] = await Promise.allSettled([
          API.get(`/api/artist/my-artworks`),
          API.get(`/api/artist/sales-history`)
        ]);

        console.log("Artworks API Response:", artRes);
        console.log("Sales API Response:", salesRes);

        if (artRes.status === 'fulfilled') setArtworks(artRes.value.data || []);
        if (salesRes.status === 'fulfilled') setSales(salesRes.value.data || []);
      } catch (err) {
        console.error('Failed to fetch artist studio data:', err);
        showFeedback('error', 'Failed to load some studio data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchArtistData();
    }
  }, [user]);

  const showFeedback = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  const handleDeleteArtwork = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this artwork?');
    if (!confirmDelete) return;

    const previousArtworks = [...artworks];

    // Optimistic deletion from state
    setArtworks(artworks.filter((a) => a._id !== id));
    setDeletingId(id);

    try {
      await API.delete(`/artworks/${id}`);
      showFeedback('success', 'Artwork deleted successfully from live catalog.');
    } catch (err) {
      // Revert back on error
      setArtworks(previousArtworks);
      showFeedback('error', err.response?.data?.message || 'Failed to delete artwork.');
    } finally {
      setDeletingId(null);
    }
  };

  const totalEarnings = sales.reduce((sum, item) => sum + (item.amount || 0), 0);

  // Filtered queries
  const filteredArtworks = artworks.filter((art) =>
    art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSales = sales.filter((s) =>
    s.artworkId?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-20 text-center space-y-4">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-500 mx-auto" />
        <p className="text-slate-400 font-medium">Loading artist studio and sales analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 text-white">
            <Palette className="w-8 h-8 text-indigo-500" /> Artist Studio Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your creations, track artwork sales, and publish new masterpieces.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Filter Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <Link
            href="/add-artwork"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Add New Artwork
          </Link>
        </div>
      </div>

      {/* Dynamic Status Feedback */}
      {statusMessage.text && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
          statusMessage.type === 'error' 
            ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' 
            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
        }`}>
          {statusMessage.type === 'error' ? (
            <AlertCircle className="w-5 h-5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          )}
          {statusMessage.text}
        </div>
      )}

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Published Artworks</span>
          <div className="text-3xl font-black text-white">{artworks.length}</div>
          <span className="text-xs text-slate-500">Live in marketplace</span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Art Sales</span>
          <div className="text-3xl font-black text-purple-400">{sales.length}</div>
          <span className="text-xs text-slate-500">Sold to collectors</span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Earnings</span>
          <div className="text-3xl font-black text-emerald-400">${totalEarnings.toFixed(2)}</div>
          <span className="text-xs text-emerald-400/80 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> Direct payouts configured
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-8">
        <button
          onClick={() => setActiveTab('artworks')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'artworks' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          My Artworks ({artworks.length})
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'sales' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Sales History ({sales.length})
        </button>
      </div>

      {/* Tab 1: Manage Artworks */}
      {activeTab === 'artworks' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-bold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Artwork</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredArtworks.length > 0 ? (
                  filteredArtworks.map((art) => (
                    <tr key={art._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img 
                          src={art.imageUrl || '/placeholder-art.png'} 
                          alt={art.title} 
                          className="w-12 h-12 object-cover rounded-lg border border-slate-700 bg-slate-950" 
                        />
                        <span className="font-semibold text-white line-clamp-1">{art.title}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        <span className="inline-flex items-center gap-1 text-xs bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                          <Tag className="w-3 h-3 text-indigo-400" /> {art.category || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-indigo-400">${art.price}</td>
                      <td className="px-6 py-4">
                        {art.isSold ? (
                          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold rounded-full">
                            SOLD OUT
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
                            AVAILABLE
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/artworks/${art._id}`}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                            title="View Artwork"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/edit-artwork/${art._id}`}
                            className="p-2 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-lg transition-colors"
                            title="Edit Artwork"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          <button
                            disabled={deletingId === art._id}
                            onClick={() => handleDeleteArtwork(art._id)}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Artwork"
                          >
                            {deletingId === art._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-slate-500">
                      No artworks found. Click "Add New Artwork" above to list your first creation!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Sales History */}
      {activeTab === 'sales' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-bold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Artwork Title</th>
                  <th className="px-6 py-4">Buyer Email</th>
                  <th className="px-6 py-4">Amount Earned</th>
                  <th className="px-6 py-4">Sale Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSales.length > 0 ? (
                  filteredSales.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{s.artworkId?.title || 'Original Artwork'}</td>
                      <td className="px-6 py-4 text-slate-300">{s.userEmail || 'collector@example.com'}</td>
                      <td className="px-6 py-4 font-extrabold text-emerald-400">${s.amount}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-slate-500">
                      No sales recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}