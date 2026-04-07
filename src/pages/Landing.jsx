import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import BridgeScene from '../components/BridgeScene';
import { authAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    const response = await authAPI.login(email, password);
    login(response.data.user, response.data.token);
    navigate('/dashboard');
  };

  const handleSignup = async ({ username, email, password }) => {
    await authAPI.register(username, email, password);
    const loginResponse = await authAPI.login(email, password);
    login(loginResponse.data.user, loginResponse.data.token);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050005] text-[#f0d0b0] px-6 py-10">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        <BridgeScene />

        <h1
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mt-6 animate-title-glow"
          style={{
            textShadow:
              '0 0 10px rgba(255,106,0,0.5), 0 0 30px rgba(232,69,32,0.3), 0 0 60px rgba(139,26,0,0.2)',
          }}
        >
          YOU SHALL NOT INJECT
        </h1>

        <p className="font-body text-[#a89878] text-center text-lg mt-3">
          A Prompt Injection Training Ground
        </p>

        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#3d2d2d] bg-[#1a1210]/90 rounded-lg p-6">
            <h2 className="font-medieval text-xl text-[#d4a843] mb-4">Sign In</h2>
            <LoginForm onSubmit={handleLogin} />
          </div>
          <div className="border border-[#3d2d2d] bg-[#1a1210]/90 rounded-lg p-6">
            <h2 className="font-medieval text-xl text-[#d4a843] mb-4">New Adventurer</h2>
            <SignupForm onSubmit={handleSignup} />
          </div>
        </div>

        <Link
          to="/dashboard"
          className="text-[#d4953a] hover:text-[#e8c547] text-center block mt-6"
        >
          Already signed in? Go to dashboard
        </Link>
      </div>
    </div>
  );
}
