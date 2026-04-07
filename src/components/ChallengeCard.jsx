import { Link } from 'react-router-dom';
import { getTheme } from '../config/levelThemes';

export default function ChallengeCard({ challenge, locked = false }) {
  const theme = getTheme(challenge.level || challenge.id);

  return (
    <div
      className={
        locked
          ? 'border border-[#3d2d2d] bg-[#1a1210] opacity-40 rounded-lg p-6 transition'
          : 'border rounded-lg p-6 transition hover:shadow-lg'
      }
      style={
        locked
          ? undefined
          : {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface + 'cc',
            }
      }
    >
      <h3
        className="text-xl font-medieval mb-2"
        style={{ color: locked ? '#6b5040' : theme.colors.text }}
      >
        {challenge.title}
      </h3>
      <p
        className="font-body mb-4"
        style={{ color: locked ? '#4a3a2a' : theme.colors.muted }}
      >
        {challenge.description}
      </p>
      <div className="flex justify-between items-center">
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold border"
          style={{
            color: locked ? '#6b5040' : theme.colors.primary,
            borderColor: locked ? '#3d2d2d' : theme.colors.primary + '4d',
            backgroundColor: locked ? 'transparent' : theme.colors.primary + '1a',
          }}
        >
          Level {challenge.level || challenge.id}
        </span>

        {locked ? (
          <button disabled className="bg-[#2a2020] text-[#6b5040] px-4 py-2 rounded-lg cursor-not-allowed font-medieval">Locked</button>
        ) : (
          <Link
            to={`/challenge/${challenge._id || challenge.id}`}
            className="px-4 py-2 rounded-lg font-medieval font-semibold transition-colors"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.bg }}
          >
            Start
          </Link>
        )}
      </div>
    </div>
  );
}
