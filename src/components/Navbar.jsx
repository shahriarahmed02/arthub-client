'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Palette, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-12 sticky top-0 z-50">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl font-bold flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          <span>ArtHub</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/artworks">Explore Artworks</Link></li>
          {user?.role === 'artist' && <li><Link href="/add-artwork">Add Artwork</Link></li>}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-primary">
              <div className="w-10 rounded-full flex items-center justify-center bg-primary text-primary-content font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="px-3 py-2 font-semibold text-sm border-b">{user.name} ({user.role})</li>
              <li><Link href="/dashboard"><UserIcon className="w-4 h-4" /> Dashboard</Link></li>
              <li><button onClick={logout} className="text-error"><LogOut className="w-4 h-4" /> Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}