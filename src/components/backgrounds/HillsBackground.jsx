import hillsImage from '../../assets/level-1-hills.png';

export default function HillsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <img
        src={hillsImage}
        alt=""
        className="absolute bottom-0 w-full h-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a] via-transparent to-[#1a2e1a]/80" />
    </div>
  );
}
