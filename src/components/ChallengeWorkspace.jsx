import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ResponseDisplay from './ResponseDisplay';
import { getTheme } from '../config/levelThemes';
import EmberParticles from './EmberParticles';
import LevelBackground from './backgrounds/LevelBackground';

export default function ChallengeWorkspace({ challenge, onSubmit, onGuess }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [passed, setPassed] = useState(null);
  const [hint, setHint] = useState('');
  const [reveal, setReveal] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [guessInput, setGuessInput] = useState('');
  const [guessing, setGuessing] = useState(false);
  const navigate = useNavigate();
  const theme = getTheme(challenge.level || challenge.id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setPassed(null);
    setReveal(null);
    setHint('');
    setGuessInput('');

    try {
      const data = await onSubmit(prompt);
      setResponse(data.response || 'No model response returned.');
      setSubmissionId(data.submissionId || null);
    } catch {
      setError('Unable to submit prompt.');
      setResponse('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuess = async (event) => {
    event.preventDefault();
    setGuessing(true);
    setHint('');

    try {
      const data = await onGuess(guessInput, submissionId);
      if (data.correct) {
        setPassed(true);
        setReveal(data.reveal || null);
      } else {
        setPassed(false);
        setHint(data.hint || 'Incorrect password. Try again.');
      }
    } catch {
      setError('Unable to verify password.');
    } finally {
      setGuessing(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 relative" style={{ background: theme.gradient, color: theme.colors.text }}>
      <LevelBackground level={challenge.level || challenge.id} />
      {theme.particles && <EmberParticles type={theme.particles.type} count={theme.particles.count} colors={theme.particles.colors} />}
      <main className="mx-auto max-w-4xl space-y-6 relative z-10">
        <Link to="/dashboard" style={{ color: theme.colors.primary }} className="hover:opacity-80 font-body transition-opacity">&larr; Back to levels</Link>

        <section className="rounded-lg p-6" style={{ border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface + 'cc' }}>
          <h1 className="text-3xl font-display" style={{ color: theme.colors.accent || theme.colors.primary }}>{challenge.title}</h1>
          <p className="mt-3 font-body" style={{ color: theme.colors.muted }}>{challenge.description}</p>
          <p className="mt-4 italic font-body text-sm" style={{ color: theme.colors.muted + '99' }}>{theme.atmosphere}</p>
        </section>

        <form onSubmit={handleSubmit} className="rounded-lg p-6" style={{ border: `1px solid ${theme.colors.border}`, backgroundColor: theme.colors.surface }} data-testid="challenge-form">
          <label htmlFor="prompt" className="block mb-2 font-medieval font-semibold" style={{ color: theme.colors.text }}>Prompt Payload</label>
          <textarea
            id="prompt"
            data-testid="challenge-prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 sm:h-40 p-3 rounded-lg focus:outline-none focus:ring-2 font-code"
            style={{ backgroundColor: theme.colors.bg, border: '1px solid ' + theme.colors.border, color: theme.colors.text, '--tw-ring-color': theme.colors.primary }}
            placeholder="Craft your injection prompt..."
            required
          />
          <button
            type="submit"
            data-testid="challenge-submit-button"
            disabled={submitting}
            className="mt-4 px-5 py-2.5 font-medieval font-semibold rounded-lg transition-shadow disabled:opacity-60"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.bg }}
          >
            {submitting ? 'Executing...' : 'Run Attack'}
          </button>
        </form>

        {error && <div className="p-4 rounded-lg border font-body" style={{ borderColor: '#d4953a40', backgroundColor: '#d4953a15', color: '#d4a843' }}>{error}</div>}

        <ResponseDisplay response={response} passed={passed} hint={hint} reveal={reveal} theme={theme} />

        {response && passed !== true && (
          <form onSubmit={handleGuess} className="rounded-lg p-6" style={{ border: '1px solid rgba(212,149,58,0.3)', backgroundColor: theme.colors.surface }}>
            <label htmlFor="password-guess" className="block mb-2 font-medieval font-semibold text-[#d4a843]">
              Extract the Password
            </label>
            <p className="text-sm mb-3 font-body" style={{ color: theme.colors.muted }}>
              Read the LLM response above. What is the secret password?
            </p>
            <div className="flex gap-3">
              <input
                id="password-guess"
                data-testid="password-guess-input"
                type="text"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                className="flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4953a] uppercase tracking-widest font-code"
                style={{ backgroundColor: theme.colors.bg, border: '1px solid ' + theme.colors.border, color: theme.colors.text }}
                placeholder="TYPE PASSWORD HERE"
                required
              />
              <button
                type="submit"
                data-testid="password-guess-submit"
                disabled={guessing}
                className="px-5 py-2 bg-[#d4953a] text-[#1a1210] font-medieval font-semibold rounded-lg hover:bg-[#e8c547] disabled:opacity-60 transition-colors"
              >
                {guessing ? 'Checking...' : 'Submit Guess'}
              </button>
            </div>
          </form>
        )}

        {passed && reveal?.nextChallengeId && (
          <button
            onClick={() => navigate(`/challenge/${reveal.nextChallengeId}`)}
            className="w-full py-3 font-medieval font-semibold rounded-lg text-lg transition-shadow"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.bg }}
          >
            Next Level &rarr;
          </button>
        )}
      </main>
    </div>
  );
}
