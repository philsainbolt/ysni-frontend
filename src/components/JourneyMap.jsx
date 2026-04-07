import levelThemes from '../config/levelThemes';
import { isLevelUnlocked } from '../services/progress';

export default function JourneyMap({ challenges, beatenLevels, onSelect }) {
  const sorted = [...challenges].sort((a, b) => {
    const levelA = a.level || a.id;
    const levelB = b.level || b.id;
    return levelA - levelB;
  });

  function getNodeState(level) {
    const beaten = beatenLevels.map(String).includes(String(level));
    if (beaten) return 'completed';
    if (isLevelUnlocked(level, beatenLevels)) return 'unlocked';
    return 'locked';
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto py-8 space-y-0">
      {sorted.map((challenge, index) => {
        const level = challenge.level || challenge.id;
        const theme = levelThemes[level] || levelThemes[1];
        const state = getNodeState(level);
        const isClickable = state !== 'locked';

        return (
          <div key={challenge._id || challenge.id}>
            {/* Waypoint row */}
            <div
              className="flex items-center gap-6 w-full"
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
              onClick={() => isClickable && onSelect(challenge._id || challenge.id)}
            >
              {/* Node */}
              <div className="flex-shrink-0 flex items-center justify-center">
                {state === 'completed' && (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#d4a843] text-white font-bold text-lg"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    &#10003;
                  </div>
                )}
                {state === 'unlocked' && (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[#1a1210]"
                    style={{
                      borderColor: theme.colors.primary,
                      boxShadow: `0 0 12px ${theme.colors.primary}88, 0 0 24px ${theme.colors.primary}44`,
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                  </div>
                )}
                {state === 'locked' && (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2a2020] border border-[#3d2d2d] opacity-50">
                    <span className="text-sm text-[#6b5040]">&#8212;</span>
                  </div>
                )}
              </div>

              {/* Level info card */}
              <div
                className={`flex-1 rounded-lg p-4 border transition-all ${isClickable ? 'cursor-pointer' : ''}`}
                style={
                  state === 'locked'
                    ? {
                        backgroundColor: `${theme.colors.surface}80`,
                        borderColor: theme.colors.border,
                        opacity: 0.4,
                        filter: 'grayscale(1)',
                      }
                    : {
                        backgroundColor: `${theme.colors.surface}cc`,
                        borderColor: theme.colors.border,
                      }
                }
              >
                <h3
                  className="font-medieval text-lg"
                  style={{ color: state === 'locked' ? '#6b5040' : theme.colors.primary }}
                >
                  {theme.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: state === 'locked' ? '#4a3a2a' : theme.colors.muted }}
                >
                  {theme.subtitle}
                </p>
              </div>
            </div>

            {/* Connecting line between waypoints */}
            {index < sorted.length - 1 && (
              <div className="flex items-center gap-6 w-full">
                <div className="flex-shrink-0 w-10 flex justify-center">
                  <div
                    className="w-0.5 h-12"
                    style={{
                      backgroundColor: (levelThemes[Math.min(level, (sorted[index + 1]?.level || sorted[index + 1]?.id))] || levelThemes[1]).colors.primary + '66',
                    }}
                  />
                </div>
                <div className="flex-1" />
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
