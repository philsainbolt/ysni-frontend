import marshImage from '../../assets/level-4-marshes.png';

export default function MarshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <img
        src={marshImage}
        alt=""
        className="absolute bottom-0 w-full h-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0a] via-transparent to-[#0d0f0a]/80" />
    </div>
  );
}
