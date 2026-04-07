import volcanoImage from '../../assets/level-5-volcano.png';

export default function VolcanoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <img
        src={volcanoImage}
        alt=""
        className="absolute bottom-0 w-full h-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-transparent to-[#0a0000]/80" />
    </div>
  );
}
