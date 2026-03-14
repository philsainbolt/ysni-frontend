import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChallengeCard from '../components/ChallengeCard';
import { useChallenges } from '../hooks/useChallenges';
import { useAuth } from '../hooks/useAuth';
import { progressAPI } from '../services/api';
import { isLevelUnlocked } from '../services/progress';

export default function Dashboard() {
  const { challenges, loading, error } = useChallenges();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [beatenLevels, setBeatenLevels] = useState([]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await progressAPI.get();
        const levels = Array.isArray(res.data?.beatenLevels)
          ? res.data.beatenLevels
          : Array.isArray(res.data?.beaten)
            ? res.data.beaten
            : [];
        setBeatenLevels(levels);
      } catch {
        setBeatenLevels([]);
      }
    };

    loadProgress();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Prompt Injection</h1>
          <div className="flex gap-4">
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Available Challenges</h2>

        {loading && <p>Loading challenges...</p>}
        {error && <p className="text-red-500">Error loading challenges: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => {
              const level = challenge.level || challenge.id;
              const locked = !isLevelUnlocked(level, beatenLevels);
              return <ChallengeCard key={challenge.id || challenge._id} challenge={challenge} locked={locked} />;
            })}
          </div>
        )}
      </main>
    </div>
  );
}
