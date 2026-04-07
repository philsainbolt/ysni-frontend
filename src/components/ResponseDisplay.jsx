export default function ResponseDisplay({ response, passed, hint, reveal, theme }) {
  const t = theme || { colors: { surface: '#1a1210', border: '#3d2d2d', bg: '#0a0505', text: '#f0d0b0', muted: '#a89878', primary: '#d4953a' } };

  return (
    <section className="rounded-lg p-6" style={{ border: '1px solid ' + t.colors.border, backgroundColor: t.colors.surface }}>
      <h2 className="text-xl font-medieval font-semibold mb-3" style={{ color: t.colors.text }}>LLM Response</h2>
      <div className="rounded-lg p-4 min-h-[120px] whitespace-pre-wrap font-code text-sm" style={{ backgroundColor: t.colors.bg, border: '1px solid ' + t.colors.border, color: t.colors.text }}>
        {response || 'No response yet.'}
      </div>

      {passed !== null && (
        <div
          data-testid={passed ? 'challenge-success-indicator' : 'challenge-failure-indicator'}
          className={`mt-4 p-3 rounded-lg border font-body ${passed ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/40 bg-rose-500/10 text-rose-300'}`}
        >
          <p className="font-semibold">{passed ? 'PASS' : 'FAIL'}</p>
          {hint && <p className="mt-1 text-sm">{hint}</p>}
        </div>
      )}

      {passed && reveal && (
        <div className="mt-6 space-y-4">
          <div className="rounded-lg p-5" style={{ border: `1px solid ${t.colors.primary}40`, backgroundColor: t.colors.bg }}>
            <h3 className="text-lg font-medieval font-semibold mb-2" style={{ color: t.colors.primary }}>How It Worked</h3>
            <p className="text-sm font-body mb-1" style={{ color: t.colors.muted }}>Technique: <span style={{ color: t.colors.primary }}>{reveal.technique}</span></p>
            <p className="mt-3 font-body" style={{ color: t.colors.text }}>{reveal.explanation}</p>
          </div>

          <div className="rounded-lg p-5" style={{ border: '1px solid rgba(212,149,58,0.3)', backgroundColor: t.colors.bg }}>
            <h3 className="text-lg font-medieval font-semibold text-[#d4a843] mb-2">The System Prompt</h3>
            <p className="text-sm font-body mb-2" style={{ color: t.colors.muted }}>This is what the LLM was told before your message:</p>
            <pre className="rounded-lg p-3 text-sm whitespace-pre-wrap font-code" style={{ backgroundColor: t.colors.surface, border: '1px solid ' + t.colors.border, color: t.colors.text }}>{reveal.systemPrompt}</pre>
          </div>

          {reveal.nextTechniqueHint && (
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-5">
              <h3 className="text-lg font-medieval font-semibold text-emerald-400 mb-2">Next Level Hint</h3>
              <p className="font-body" style={{ color: t.colors.text }}>{reveal.nextTechniqueHint}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
