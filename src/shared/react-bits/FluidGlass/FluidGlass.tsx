import './FluidGlass.css';

type FluidGlassProps = {
  mode?: 'lens' | 'bar' | 'cube';
};

export function FluidGlass({ mode = 'lens' }: FluidGlassProps) {
  return (
    <div className={`fluid-glass fluid-glass--${mode}`} aria-hidden="true">
      <span />
    </div>
  );
}
