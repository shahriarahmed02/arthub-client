'use client';

import { useState, useEffect } from 'react';
import API from '@/lib/api';
import { Users, Palette, DollarSign, ShoppingCart, Shield, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [analyticsRes, usersRes, transRes] = await Promise.all([
          API.get('/admin/analytics'),
          API.get('/admin/users'),
          API.get('/admin/transactions')
        ]);
        setAnalytics(analyticsRes.data);
        setUsers(usersRes.data);
        setTransactions(transRes.data);
      } catch (err) {
        console.error('Failed to fetch admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await API.patch(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(users.map((u) => (u._id === userId ? res.data : u)));
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-10 text-center space-y-4">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-slate-400">Loading System Analytics & Management...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <Shield className="w-8 h-8 text-indigo-500" /> Admin Command Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor system analytics, update user roles, and track all live marketplace transactions.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Users</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">{analytics?.totalUsers || 0}</div>
          <span className="text-xs text-slate-500">Artists: {analytics?.totalArtists || 0}</span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Artworks</span>
            <Palette className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">{analytics?.totalArtworks || 0}</div>
          <span className="text-xs text-slate-500">Published in gallery</span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Items Sold</span>
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{analytics?.totalSold || 0}</div>
          <span className="text-xs text-slate-500">Purchased by collectors</span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Platform Revenue</span>
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">${analytics?.totalRevenue || '0.00'}</div>
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Stripe Live Volume
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-8">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'users' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Manage Users & Roles ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'transactions' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Platform Transactions ({transactions.length})
        </button>
      </div>

      {/* Tab 1: Manage Users */}
      {activeTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-bold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Change Role Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{u.name}</td>
                    <td className="px-6 py-4 text-slate-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          u.role === 'admin'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : u.role === 'artist'
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
                      >
                        <option value="user">Buyer (User)</option>
                        <option value="artist">Artist</option>
                        <option value="admin">System Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: All Transactions */}
      {activeTab === 'transactions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs font-bold uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">User Email</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <tr key={t._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-indigo-400">{t._id}</td>
                      <td className="px-6 py-4 font-medium uppercase text-xs">{t.type || 'Artwork Purchase'}</td>
                      <td className="px-6 py-4 text-slate-300">{t.userEmail || 'collector@example.com'}</td>
                      <td className="px-6 py-4 font-extrabold text-emerald-400">${t.amount}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-slate-500">
                      No recorded transactions found in database.
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