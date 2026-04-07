import mountainImage from '../../assets/level-3-mountains.png';

export default function MountainBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <img
        src={mountainImage}
        alt=""
        className="absolute bottom-0 w-full h-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714] via-transparent to-[#1a1714]/80" />
    </div>
  );
}
