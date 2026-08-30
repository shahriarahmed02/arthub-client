'use client';

import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      router.push('/artworks');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 my-8">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-2">Create an Account</h2>

          {error && <div className="alert alert-error text-sm py-2 mb-2"><span>{error}</span></div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name</span></label>
              <input 
                type="text" 
                name="name"
                placeholder="John Doe" 
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Email Address</span></label>
              <input 
                type="email" 
                name="email"
                placeholder="email@example.com" 
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Account Role</span></label>
              <select 
                name="role" 
                className="select select-bordered w-full"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">General User (Buyer)</option>
                <option value="artist">Artist (Seller)</option>
              </select>
            </div>

            <button type="submit" className={`btn btn-primary w-full mt-4 ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}