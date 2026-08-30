'use client';

import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import API from '@/lib/api';
import { Loader2, PlusCircle } from 'lucide-react';

export default function AddArtworkPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Digital Painting',
    imageUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/artworks', {
        ...formData,
        price: parseFloat(formData.price),
        artistName: user?.name || user?.email?.split('@')[0] || 'Unknown Artist'
      });
      router.push('/artworks');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add artwork');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4 flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-primary" /> Post New Artwork
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Artwork Title</span></label>
              <input
                type="text"
                className="input input-bordered w-vull focus:outline-none focus:border-primary"
                placeholder="e.g. Cyberpunk Metropolis"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Price ($)</span></label>
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                  placeholder="49.99"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Category</span></label>
                <select
                  className="select select-bordered w-full focus:outline-none focus:border-primary"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Digital Painting">Digital Painting</option>
                  <option value="3D Art">3D Art</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Abstract">Abstract</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Image URL</span></label>
              <input
                type="url"
                className="input input-bordered w-full focus:outline-none focus:border-primary"
                placeholder="https://images.unsplash.com/..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Description</span></label>
              <textarea
                className="textarea textarea-bordered h-28 w-full focus:outline-none focus:border-primary"
                placeholder="Describe your artwork and inspiration..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full mt-4 font-bold text-base gap-2 shadow-lg shadow-primary/20" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
                </>
              ) : (
                'Publish Artwork'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}