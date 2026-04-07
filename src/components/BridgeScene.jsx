import bridgeImage from '../assets/bridge-scene.webp';

export default function BridgeScene() {
  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      <img
        src={bridgeImage}
        alt="A wizard stands on a crumbling stone bridge, staff raised against a towering fire demon"
        className="w-full h-auto rounded-lg shadow-[0_0_60px_rgba(232,69,32,0.3)]"
      />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#050005] via-transparent to-transparent" />
    </div>
  );
}
