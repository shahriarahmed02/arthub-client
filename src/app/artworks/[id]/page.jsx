'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import API from '@/lib/api';
import { AuthContext } from '@/context/AuthContext';
import { ShoppingBag, MessageSquare, ShieldCheck, Tag, User, Loader2, AlertCircle } from 'lucide-react';

export default function ArtworkDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [artwork, setArtwork] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artRes, commentRes] = await Promise.allSettled([
          API.get(`/artworks/${id}`),
          API.get(`/comments/${id}`)
        ]);

        if (artRes.status === 'fulfilled') setArtwork(artRes.value.data);
        if (commentRes.status === 'fulfilled') setComments(commentRes.value.data || []);
      } catch (err) {
        console.error('Failed to load artwork details:', err);
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
      if (res.data?.url) {
        window.location.href = res.data.url; // Stripe Checkout-এ নিয়ে যাওয়া
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

    if (!newComment.trim()) return;

    if (!user) {
      return router.push('/login');
    }

    setPostingComment(true);
    try {
      const res = await API.post(`/comments/${id}`, {
        comment: newComment,
        userName: user?.name || user?.email?.split('@')[0] || 'Collector'
      });
      
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to add comment. Verified purchase may be required!');
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-20 text-center space-y-3">
        <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
        <p className="text-base-content/70 font-medium">Loading artwork details...</p>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="max-w-6xl mx-auto p-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-error mx-auto" />
        <h2 className="text-2xl font-bold">Artwork Not Found</h2>
        <p className="text-base-content/60">The artwork you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden border border-base-300 shadow-2xl bg-base-300">
          <img 
            src={artwork.imageUrl || '/placeholder-art.png'} 
            alt={artwork.title} 
            className="w-full h-auto object-cover max-h-[500px]" 
          />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
            <Tag className="w-3.5 h-3.5" /> {artwork.category || 'General'}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{artwork.title}</h1>

          <div className="flex items-center gap-2 text-base-content/80 font-medium text-sm">
            <User className="w-4 h-4 text-primary" /> Created by <span className="font-bold text-base-content">{artwork.artistName || 'Unknown Artist'}</span>
          </div>

          <p className="text-base-content/70 leading-relaxed text-sm md:text-base">{artwork.description}</p>

          <div className="p-6 bg-base-200/60 rounded-2xl border border-base-300 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-base-content/60">Price</span>
              <span className="text-3xl font-black text-primary">${artwork.price}</span>
            </div>

            {artwork.isSold ? (
              <button className="btn btn-disabled w-full btn-lg font-bold">Sold Out</button>
            ) : (
              <button
                onClick={handleBuyNow}
                disabled={purchasing}
                className="btn btn-primary w-full btn-lg gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 font-bold"
              >
                {purchasing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Buy Now with Stripe
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Verified Comments Section */}
      <div className="pt-8 border-t border-base-300 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" /> Collector Reviews & Comments
        </h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            className="textarea textarea-bordered w-full h-28 focus:outline-none focus:border-primary text-sm"
            placeholder={user ? "Leave a review or comment..." : "Please login to leave a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user || postingComment}
            required
          ></textarea>

          {commentError && (
            <div className="alert alert-warning text-xs md:text-sm py-2 px-4 rounded-xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{commentError}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-md gap-2 font-semibold" 
            disabled={!user || postingComment || !newComment.trim()}
          >
            {postingComment ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Comment'}
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4 pt-4">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c._id || c.id} className="p-4 bg-base-200/50 border border-base-300 rounded-xl space-y-1 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-base-content">{c.userName}</span>
                  <span className="text-xs text-base-content/50">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                <p className="text-sm text-base-content/80">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-base-content/50 italic">No comments yet. Be the first collector to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}