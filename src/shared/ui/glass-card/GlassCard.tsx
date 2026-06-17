import type { ReactNode } from 'react';
import clsx from 'clsx';
import { BorderGlow } from '@shared/react-bits/BorderGlow/BorderGlow';
import './GlassCard.css';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <BorderGlow className={clsx('glass-card', className)} borderRadius={8} interactive={false}>
      {children}
    </BorderGlow>
  );
}
