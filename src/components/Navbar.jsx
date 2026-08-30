'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Palette, LogOut, User as UserIcon, Menu, LayoutDashboard, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();

  // Role-based dashboard route helper
  const getDashboardRoute = () => {
    if (user?.role === 'admin') return '/dashboard/admin';
    if (user?.role === 'artist') return '/dashboard/artist';
    return '/dashboard/user';
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-12 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto navbar min-h-[4rem] p-0">
        
        {/* Navbar Start: Logo & Mobile Hamburger */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile Menu Dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-slate-300 hover:text-white">
              <Menu className="w-6 h-6" />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-slate-900 border border-slate-800 rounded-2xl w-56 space-y-1">
              <li>
                <Link href="/" className={isActive('/') ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-slate-300'}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/artworks" className={isActive('/artworks') ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-slate-300'}>
                  Browse Artworks
                </Link>
              </li>
              {user?.role === 'artist' && (
                <li>
                  <Link href="/dashboard/artist" className={isActive('/dashboard/artist') ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-slate-300'}>
                    <PlusCircle className="w-4 h-4" /> Add Artwork
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-white tracking-tight hover:opacity-90 transition-opacity">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
              <Palette className="w-5 h-5" />
            </div>
            <span>Art<span className="text-indigo-400">Hub</span></span>
          </Link>
        </div>

        {/* Navbar Center: Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8 font-semibold text-sm">
            <li>
              <Link
                href="/"
                className={`transition-colors py-2 border-b-2 ${
                  isActive('/')
                    ? 'text-indigo-400 border-indigo-500'
                    : 'text-slate-300 border-transparent hover:text-white'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/artworks"
                className={`transition-colors py-2 border-b-2 ${
                  isActive('/artworks')
                    ? 'text-indigo-400 border-indigo-500'
                    : 'text-slate-300 border-transparent hover:text-white'
                }`}
              >
                Browse Artworks
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href={getDashboardRoute()}
                  className={`transition-colors py-2 border-b-2 ${
                    pathname.startsWith('/dashboard')
                      ? 'text-indigo-400 border-indigo-500'
                      : 'text-slate-300 border-transparent hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Navbar End: Auth Controls & Profile */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-indigo-500/50 hover:ring-indigo-500 transition-all">
                <div className="w-10 rounded-full flex items-center justify-center bg-indigo-600 text-white font-bold">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                  )}
                </div>
              </label>

              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-slate-900 border border-slate-800 rounded-2xl w-60 space-y-2">
                <li className="px-3 py-2 border-b border-slate-800">
                  <p className="font-bold text-white text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-indigo-400 font-medium capitalize">{user?.role || 'User'} Account</p>
                </li>
                
                <li>
                  <Link href={getDashboardRoute()} className="text-slate-200 hover:text-indigo-400 py-2">
                    <LayoutDashboard className="w-4 h-4 text-indigo-400" /> Dashboard
                  </Link>
                </li>

                <li>
                  <button onClick={logout} className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 py-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}