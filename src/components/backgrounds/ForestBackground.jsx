import forestImage from '../../assets/level-2-forest.webp';

export default function ForestBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <img
        src={forestImage}
        alt=""
        className="absolute bottom-0 w-full h-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-[#1a1a2e]/80" />
    </div>
  );
}
