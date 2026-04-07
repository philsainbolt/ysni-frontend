import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import JourneyMap from '../components/JourneyMap';
import { useAuth } from '../hooks/useAuth';
import { progressAPI, challengeAPI } from '../services/api';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [beatenLevels, setBeatenLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [challengeRes, progressRes] = await Promise.all([
          challengeAPI.getAll(),
          progressAPI.get(),
        ]);
        setChallenges(challengeRes.data || []);
        const levels = Array.isArray(progressRes.data?.beatenLevels)
          ? progressRes.data.beatenLevels
          : Array.isArray(progressRes.data?.beaten)
            ? progressRes.data.beaten
            : [];
        setBeatenLevels(levels);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div
      className="min-h-screen text-[#f0d0b0]"
      style={{ background: 'linear-gradient(to top, #0f1f0f 0%, #131320 25%, #151210 50%, #0d0f0a 75%, #0a0000 95%, #050005 100%)' }}
    >
      <NavBar>
        <Link to="/profile" className="text-[#d4a843] hover:text-[#e8c547] font-body">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-[#5a1a0a] text-[#f0d0b0] px-4 py-2 rounded-lg hover:bg-[#8b1a00] font-medieval transition-colors"
        >
          Logout
        </button>
      </NavBar>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl font-display text-[#d4a843] mb-2 text-center">The Journey Awaits</h2>
        <p className="text-[#a89878] text-center font-body mb-8">Five trials stand between you and the Ashen Peak</p>

        {loading && <p className="text-[#a89878]">The path unfolds...</p>}
        {error && <p className="text-rose-400">Error loading challenges: {error}</p>}

        {!loading && !error && (
          <JourneyMap
            challenges={challenges}
            beatenLevels={beatenLevels}
            onSelect={(id) => navigate('/challenge/' + id)}
          />
        )}
      </main>
    </div>
  );
}
