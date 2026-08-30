'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import API from '@/lib/api';
import { AuthContext } from '@/context/AuthContext';
import { ShoppingBag, MessageSquare, ShieldCheck, Tag, User } from 'lucide-react';

export default function ArtworkDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [artwork, setArtwork] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artRes, commentRes] = await Promise.all([
          API.get(`/artworks/${id}`),
          API.get(`/comments/${id}`)
        ]);
        setArtwork(artRes.data);
        setComments(commentRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleBuyNow = async () => {
    if (!user) {
      return router.push('/login');
    }

    setPurchasing(true);
    try {
      const res = await API.post('/payment/create-checkout-session', { artworkId: id });
      if (res.data.url) {
        window.location.href = res.data.url; // Stripe checkout-এ রিডাইরেক্ট করা
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to initiate purchase session.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError('');

    try {
      const res = await API.post(`/comments/${id}`, {
        comment: newComment,
        userName: user?.name
      });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to add comment. Purchase required!');
    }
  };

  if (loading) {
    return <div className="max-w-5xl mx-auto p-12 text-center text-lg">Loading details...</div>;
  }

  if (!artwork) {
    return <div className="max-w-5xl mx-auto p-12 text-center text-lg">Artwork not found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden border border-base-200 shadow-2xl bg-base-300">
          <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-auto object-cover" />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full">
            <Tag className="w-4 h-4" /> {artwork.category}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight">{artwork.title}</h1>

          <div className="flex items-center gap-2 text-base-content/80 font-medium">
            <User className="w-5 h-5 text-primary" /> Created by <span className="font-bold text-base-content">{artwork.artistName}</span>
          </div>

          <p className="text-base-content/70 leading-relaxed">{artwork.description}</p>

          <div className="p-6 bg-base-200/60 rounded-2xl border border-base-200 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-base-content/60">Price</span>
              <span className="text-3xl font-extrabold text-primary">${artwork.price}</span>
            </div>

            {artwork.isSold ? (
              <button className="btn btn-disabled w-full btn-lg">Sold Out</button>
            ) : (
              <button
                onClick={handleBuyNow}
                disabled={purchasing}
                className="btn btn-primary w-full btn-lg gap-2 shadow-lg hover:shadow-primary/50"
              >
                <ShoppingBag className="w-5 h-5" /> {purchasing ? 'Redirecting to Stripe...' : 'Buy Now with Stripe'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Verified Comments Section */}
      <div className="pt-8 border-t border-base-200 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" /> Collector Reviews & Comments
        </h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder={user ? "Leave a verified review (Available for purchasers)..." : "Please login to leave a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user}
            required
          ></textarea>

          {commentError && (
            <div className="alert alert-warning text-sm py-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{commentError}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-sm" disabled={!user}>
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4 pt-4">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c._id} className="p-4 bg-base-100 border border-base-200 rounded-xl space-y-1 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{c.userName}</span>
                  <span className="text-xs text-base-content/50">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-base-content/80">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-base-content/60">No comments yet. Be the first collector to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}