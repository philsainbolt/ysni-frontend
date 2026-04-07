import HillsBackground from './HillsBackground';
import ForestBackground from './ForestBackground';
import MountainBackground from './MountainBackground';
import MarshBackground from './MarshBackground';
import VolcanoBackground from './VolcanoBackground';

const backgrounds = {
  1: HillsBackground,
  2: ForestBackground,
  3: MountainBackground,
  4: MarshBackground,
  5: VolcanoBackground,
};

export default function LevelBackground({ level }) {
  const Bg = backgrounds[level];
  if (!Bg) return null;
  return <Bg />;
}
