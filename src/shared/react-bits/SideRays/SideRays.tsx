import clsx from 'clsx';
import type { CSSProperties } from 'react';
import './SideRays.css';

type SideRaysStyle = CSSProperties & Record<string, string | number | undefined>;

type SideRaysProps = {
  className?: string;
  color?: string;
  intensity?: number;
};

export function SideRays({ className, color = '#f4c6a8', intensity = 1 }: SideRaysProps) {
  const style: SideRaysStyle = {
    '--side-rays-color': color,
    '--side-rays-intensity': intensity
  };

  return (
    <div className={clsx('side-rays', className)} style={style} aria-hidden="true">
      <span className="side-rays__ray side-rays__ray--left-a" />
      <span className="side-rays__ray side-rays__ray--left-b" />
      <span className="side-rays__ray side-rays__ray--right-a" />
      <span className="side-rays__ray side-rays__ray--right-b" />
      <span className="side-rays__mist" />
    </div>
  );
}
