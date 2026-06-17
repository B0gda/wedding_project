import type { CSSProperties } from 'react';
import './Aurora.css';

type AuroraStyle = CSSProperties & Record<string, string | number | undefined>;

type AuroraProps = {
  colorStops?: [string, string, string];
  blend?: number;
  amplitude?: number;
  speed?: number;
};

export function Aurora({
  colorStops = ['#b8afa3', '#f1eadf', '#8b6b55'],
  blend = 0.5,
  amplitude = 1,
  speed = 1
}: AuroraProps) {
  const style: AuroraStyle = {
    '--aurora-a': colorStops[0],
    '--aurora-b': colorStops[1],
    '--aurora-c': colorStops[2],
    '--aurora-blend': blend,
    '--aurora-amplitude': amplitude,
    '--aurora-speed': `${String(18 / speed)}s`
  };

  return (
    <div className="aurora" style={style} aria-hidden="true">
      <span className="aurora__layer aurora__layer--one" />
      <span className="aurora__layer aurora__layer--two" />
      <span className="aurora__grain" />
    </div>
  );
}
