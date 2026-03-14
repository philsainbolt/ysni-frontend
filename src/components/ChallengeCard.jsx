import React from 'react';
import { Link } from 'react-router-dom';

export default function ChallengeCard({ challenge }) {
  return (
    <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
      <p className="text-gray-600 mb-4">{challenge.description}</p>
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">
          Level {challenge.level || challenge.id}
        </span>
        <Link
          to={`/challenge/${challenge.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Start
        </Link>
      </div>
    </div>
  );
}
