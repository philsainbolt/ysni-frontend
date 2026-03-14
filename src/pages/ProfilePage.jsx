import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authAPI.profile();
        setProfile(res.data);
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!profile) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-blue-800">← Back to Dashboard</button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <p className="text-gray-600">Username</p>
            <p className="text-2xl font-bold">{profile.username}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="text-lg">{profile.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Current Level</p>
            <p className="text-lg font-semibold">{profile.progressLevel || 1}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
