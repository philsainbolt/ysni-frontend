import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CHALLENGES } from '../data/challenges';
import { challengeAPI, progressAPI } from '../services/api';
import { readLocalProgress, saveLocalProgress } from '../services/progress';

export default function ChallengePage() {
  const { id } = useParams();
  const challenge = useMemo(() => CHALLENGES.find((item) => item.id === id), [id]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [passed, setPassed] = useState(null);
  const [hint, setHint] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
        <p>Challenge not found.</p>
        <Link to="/" className="text-cyan-400">Return to levels</Link>
      </div>
    );
  }

  const markComplete = async () => {
    const local = readLocalProgress().map(String);
    if (!local.includes(challenge.id)) {
      const updated = [...local, challenge.id].sort((a, b) => Number(a) - Number(b));
      saveLocalProgress(updated);
    }

    try {
      await progressAPI.beat(challenge.id);
    } catch {
      setError('Challenge passed, but backend progress sync failed. Saved locally.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const result = await challengeAPI.submit(challenge.id, prompt);
      const data = result.data || {};
      setResponse(data.response || data.output || 'No model response returned.');
      setPassed(Boolean(data.pass || data.success));
      setHint(data.hint || '');

      if (data.pass || data.success) {
        await markComplete();
      }
    } catch {
      setError('Unable to reach backend. Start backend server and try again.');
      setPassed(false);
      setHint('No verdict available while offline.');
      setResponse('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <main className="mx-auto max-w-4xl space-y-6">
        <Link to="/" className="text-cyan-400 hover:text-cyan-300">← Back to levels</Link>

        <section className="border border-cyan-500/30 bg-slate-900/80 rounded-lg p-6">
          <h1 className="text-3xl font-bold font-mono">{challenge.title}</h1>
          <p className="mt-3 text-slate-300">{challenge.description}</p>
          <p className="mt-3 text-cyan-200"><span className="font-semibold">Objective:</span> {challenge.objective}</p>
          <p className="mt-2 text-slate-400"><span className="font-semibold">Hint:</span> {challenge.hint}</p>
        </section>

        <form onSubmit={handleSubmit} className="border border-slate-700 bg-slate-900 rounded-lg p-6" data-testid="challenge-form">
          <label htmlFor="prompt" className="block mb-2 font-semibold">Prompt Payload</label>
          <textarea
            id="prompt"
            data-testid="challenge-prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-40 p-3 bg-slate-950 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Craft your injection prompt..."
            required
          />
          <button
            type="submit"
            data-testid="challenge-submit-button"
            disabled={submitting}
            className="mt-4 px-5 py-2 bg-cyan-500 text-slate-950 font-semibold rounded hover:bg-cyan-400 disabled:opacity-60"
          >
            {submitting ? 'Executing...' : 'Run Attack'}
          </button>
        </form>

        {error && <div className="p-4 border border-amber-500/40 bg-amber-500/10 text-amber-200 rounded">{error}</div>}

        <section className="border border-slate-700 bg-slate-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold font-mono mb-3">LLM Response</h2>
          <div className="bg-slate-950 border border-slate-800 rounded p-4 min-h-[120px] text-slate-200 whitespace-pre-wrap">
            {response || 'No response yet.'}
          </div>

          {passed !== null && (
            <div
              data-testid={passed ? 'challenge-success-indicator' : 'challenge-failure-indicator'}
              className={`mt-4 p-3 rounded border ${passed ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/40 bg-rose-500/10 text-rose-300'}`}
            >
              <p className="font-semibold">{passed ? 'PASS' : 'FAIL'}</p>
              {hint && <p className="mt-1 text-sm">{hint}</p>}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
