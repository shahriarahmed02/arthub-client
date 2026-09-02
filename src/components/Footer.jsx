'use client';

import Link from 'next/link';
import { Send, Heart } from 'lucide-react';

// Inline SVG components for brand icons to avoid Lucide import errors
function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Artistry Market
          </h2>
          <p className="text-sm text-slate-400">
            A premier marketplace connecting talented digital artists and art collectors around the world.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/artworks" className="hover:text-indigo-400 transition-colors">
                Explore Gallery
              </Link>
            </li>
            <li>
              <Link href="/dashboard/artist" className="hover:text-indigo-400 transition-colors">
                Studio Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Art Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/artworks?category=Digital Paintings" className="hover:text-indigo-400 transition-colors">
                Digital Paintings
              </Link>
            </li>
            <li>
              <Link href="/artworks?category=3D Concepts" className="hover:text-indigo-400 transition-colors">
                3D Concepts
              </Link>
            </li>
            <li>
              <Link href="/artworks?category=Pixel Art" className="hover:text-indigo-400 transition-colors">
                Pixel Art
              </Link>
            </li>
            <li>
              <Link href="/artworks?category=Vector Illustrations" className="hover:text-indigo-400 transition-colors">
                Vector Illustrations
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Stay Updated
          </h3>
          <p className="text-xs text-slate-400">
            Subscribe to receive updates on new artwork drops and weekly featured artists.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
              aria-label="Subscribe"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Artistry Market. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators worldwide.
        </p>
      </div>
    </footer>
  );
}